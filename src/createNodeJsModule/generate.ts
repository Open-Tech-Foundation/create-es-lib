import Path from 'path';

import copyTemplates from '../tools/copyTemplates';
import IConfig from '../IConfig';
import compile from '../utils/compile';
import { mkdir, readFile, writeFile } from '../utils/fs';
import prettify from '../utils/prettify';

export default async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  await copyTemplates(templatePath, destPath, config, [
    '!jest_spec.ejs',
    '!jest.config.js',
  ]);

  let buffer, data;

  if (config.testRunner && config.testRunner === 'jest') {
    // Add jest config file
    buffer = await readFile(Path.join(templatePath, 'jest.config.js'));
    data = compile(buffer, { ...config });
    data = prettify(data.toString(), Path.join(destPath, 'jest.config.js'));
    await writeFile(Path.join(destPath, 'jest.config.js'), data);

    // Add jest spec file
    await mkdir(Path.join(destPath, '__tests__'));
    buffer = await readFile(Path.join(templatePath, 'jest_spec.ejs'));
    data = compile(buffer, { ...config });
    const destFilePath = Path.join(
      destPath,
      '__tests__',
      config.pkgName + '.spec.js'
    );
    data = prettify(data.toString(), destFilePath);
    await writeFile(destFilePath, data);
  }
}
