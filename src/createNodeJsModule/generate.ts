import globby from 'globby';
import Path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';

import IBasicConfig from '../IBasicConfig';
import compile from '../compile';
import camelcase from 'camelcase';

export default async function generate(
  templatePath: string,
  basicConfig: IBasicConfig,
) {
  const filePaths = await globby([templatePath], { dot: true });
  for await (let f of filePaths) {
    const buffer = await readFile(f);
    const fileExt = Path.extname(f);
    let newFilePath = Path.join(
      process.cwd(),
      basicConfig.libName,
      f.replace(templatePath, ''),
    );
    let data;

    if (fileExt === '.ejs') {
      data = compile(buffer, {
        libName: camelcase(basicConfig.libName),
        ts: basicConfig.ts,
      });
      newFilePath = newFilePath.replace(
        fileExt,
        basicConfig.ts ? '.ts' : '.js',
      );
    } else {
      data = buffer;
    }

    await mkdir(Path.dirname(newFilePath), { recursive: true });
    await writeFile(newFilePath, data);
  }
}
