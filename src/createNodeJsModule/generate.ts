import fg from 'fast-glob';
import Path from 'path';
import fs from 'fs';
import { promisify } from 'util';

import IConfig from '../IConfig';
import compile from '../utils/compile';
import prettify from '../utils/prettify';

const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export default async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  const filePaths = await fg([`${templatePath}/**`], { dot: true });

  for await (const f of filePaths) {
    const buffer = await readFile(f);
    const fileExt = Path.extname(f);
    let destFilePath = Path.join(destPath, f.replace(templatePath, ''));
    let data;

    if (fileExt === '.ejs') {
      data = compile(buffer, {
        ...config,
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
      Path.join(templatePath, '..', 'shared', 'licenses', config.lic + '.ejs')
    );
    const data = compile(buffer, { ...config });
    const destFilePath = Path.join(destPath, 'LICENSE');
    await writeFile(destFilePath, data);
  }

  if (config.bundler && config.bundler === 'rollup') {
    const buffer = await readFile(
      Path.join(templatePath, '..', 'shared', 'bundler', 'rollup.config.js.ejs')
    );
    let data = compile(buffer, config);
    const destFilePath = Path.join(destPath, 'rollup.config.js');
    data = prettify(data.toString(), destFilePath);
    await writeFile(destFilePath, data);
  }

  if (config.testRunner && config.testRunner === 'jest') {
    await mkdir(Path.join(destPath, '__tests__'));
    const buffer = await readFile(
      Path.join(templatePath, '..', 'shared', 'jest.ejs')
    );
    let data = compile(buffer, config);
    const destFilePath = Path.join(
      destPath,
      '__tests__',
      config.pkgName + '.spec.js'
    );
    data = prettify(data.toString(), destFilePath);
    await writeFile(destFilePath, data);
  }
}
