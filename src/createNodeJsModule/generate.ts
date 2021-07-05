import globby from 'globby';
import Path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import camelcase from 'camelcase';

import IConfig from '../IConfig';
import compile from '../utils/compile';
import prettify from '../utils/prettify';
import getPkgName from '../utils/getPkgName';

export default async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  const filePaths = await globby([templatePath], { dot: true });
  for await (const f of filePaths) {
    const buffer = await readFile(f);
    const fileExt = Path.extname(f);
    let destFilePath = Path.join(destPath, f.replace(templatePath, ''));
    let data;

    if (fileExt === '.ejs') {
      data = compile(buffer, {
        ...config,
        libName: camelcase(config.libName),
        pkgName: getPkgName(config.libName, config.pkgScope),
      });
      destFilePath = destFilePath.replace(fileExt, '');
    } else {
      data = buffer;
    }

    if (Path.extname(destFilePath) === '.js' && config.ts) {
      destFilePath = destFilePath.replace('.js', '.ts');
    }

    data = prettify(data.toString(), destFilePath);
    await mkdir(Path.dirname(destFilePath), { recursive: true });
    await writeFile(destFilePath, data);
  }

  if (config.lic) {
    const buffer = await readFile(
      Path.join(templatePath, '..', 'licenses', config.lic + '.ejs')
    );
    const data = compile(buffer, { ...config });
    const destFilePath = Path.join(destPath, 'LICENSE');
    await writeFile(destFilePath, data);
  }
}
