import globby from 'globby';
import Path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import camelcase from 'camelcase';

import IBasicConfig from '../IBasicConfig';
import compile from '../compile';
import prettify from '../utils/prettify';

export default async function generate(
  templatePath: string,
  basicConfig: IBasicConfig
): Promise<void> {
  const filePaths = await globby([templatePath], { dot: true });
  for await (const f of filePaths) {
    const buffer = await readFile(f);
    const fileExt = Path.extname(f);
    let newFilePath = Path.join(
      process.cwd(),
      basicConfig.libName,
      f.replace(templatePath, '')
    );
    let data;

    if (fileExt === '.ejs') {
      data = compile(buffer, {
        libName: camelcase(basicConfig.libName),
        ts: basicConfig.ts,
      });
      newFilePath = newFilePath.replace(fileExt, '');
    } else {
      data = buffer;
    }

    if (Path.extname(newFilePath) === '.js' && basicConfig.ts) {
      newFilePath = newFilePath.replace('.js', '.ts');
    }

    data = prettify(data.toString(), newFilePath);
    await mkdir(Path.dirname(newFilePath), { recursive: true });
    await writeFile(newFilePath, data);
  }
}
