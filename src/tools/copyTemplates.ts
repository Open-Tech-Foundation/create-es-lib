import Path from 'path';
import { globSync } from '@open-tech-world/node-glob';

import IConfig from '../IConfig';
import compile from '../utils/compile';
import prettify from '../utils/prettify';
import { mkdir, readFile, writeFile } from '../utils/fs';

async function copyFiles(
  from: string,
  to: string,
  ignore: string[],
  config: IConfig
) {
  const filePaths = globSync(['**', ...ignore], {
    dot: true,
    cwd: from,
    absolute: true,
    dirs: false,
  });

  for await (const templateFile of filePaths) {
    // const templateFile = Path.join(from, f);

    // if (process.platform === 'win32') {
    //   templateFile = f.replace(/\//g, '\\');
    // }

    const buffer = await readFile(templateFile);
    const fileExt = Path.extname(templateFile);
    let destFilePath = Path.join(to, templateFile.replace(from, ''));
    let data;

    if (fileExt === '.ejs') {
      data = compile(buffer, { ...config });
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
}

async function copyTemplates(
  templatePath: string,
  destPath: string,
  config: IConfig,
  ignore: string[]
): Promise<void> {
  await copyFiles(templatePath, destPath, ignore, config);
  const commonFilesPath = Path.join(templatePath, '..', 'default');
  await copyFiles(commonFilesPath, destPath, [], config);

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
    let data = compile(buffer, { ...config });
    const destFilePath = Path.join(destPath, 'rollup.config.js');
    data = prettify(data.toString(), destFilePath);
    await writeFile(destFilePath, data);
  }
}

export default copyTemplates;
