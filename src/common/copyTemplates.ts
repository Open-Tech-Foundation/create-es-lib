import fg from 'fast-glob';
import Path from 'path';
import fs from 'fs';
import { promisify } from 'util';
import normalizePath from 'normalize-path';

import IConfig from '../IConfig';
import compile from '../utils/compile';
import prettify from '../utils/prettify';

const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export default async function copyTemplates(
  templatePath: string,
  destPath: string,
  config: IConfig,
  ignore: string[]
): Promise<void> {
  const filePaths = await fg([`${normalizePath(templatePath)}/**`, ...ignore], {
    dot: true,
  });

  for await (const f of filePaths) {
    let templateFile = f;

    if (process.platform === 'win32') {
      templateFile = f.replace(/\//g, '\\');
    }

    const buffer = await readFile(templateFile);
    const fileExt = Path.extname(templateFile);
    let destFilePath = Path.join(
      destPath,
      templateFile.replace(templatePath, '')
    );
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