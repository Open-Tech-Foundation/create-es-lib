import globby from 'globby';
import Path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import camelcase from 'camelcase';

import IConfig from '../IConfig';
import compile from '../compile';
import prettify from '../utils/prettify';
import getPkgName from '../utils/getPkgName';

export default async function generate(
  templatePath: string,
  config: IConfig
): Promise<void> {
  const filePaths = await globby([templatePath], { dot: true });
  for await (const f of filePaths) {
    const buffer = await readFile(f);
    const fileExt = Path.extname(f);
    let newFilePath = Path.join(
      process.cwd(),
      config.libName,
      f.replace(templatePath, '')
    );
    let data;

    if (fileExt === '.ejs') {
      data = compile(buffer, {
        ...config,
        libName: camelcase(config.libName),
        pkgName: getPkgName(config.libName, config.pkgScope),
      });
      newFilePath = newFilePath.replace(fileExt, '');
    } else {
      data = buffer;
    }

    if (Path.extname(newFilePath) === '.js' && config.ts) {
      newFilePath = newFilePath.replace('.js', '.ts');
    }

    data = prettify(data.toString(), newFilePath);
    await mkdir(Path.dirname(newFilePath), { recursive: true });
    await writeFile(newFilePath, data);
  }
}
