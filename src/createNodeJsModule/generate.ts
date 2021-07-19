import Path from 'path';

import copyTemplates from '../common/copyTemplates';
import IConfig from '../IConfig';
import compile from '../utils/compile';
import { mkdir, readFile, writeFile } from '../utils/fs';
import prettify from '../utils/prettify';

export default async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  await copyTemplates(templatePath, destPath, config, ['!**/jest.ejs']);

  if (config.testRunner && config.testRunner === 'jest') {
    await mkdir(Path.join(destPath, '__tests__'));
    const buffer = await readFile(Path.join(templatePath, 'jest.ejs'));
    let data = compile(buffer, { ...config });
    const destFilePath = Path.join(
      destPath,
      '__tests__',
      config.pkgName + '.spec.js'
    );
    data = prettify(data.toString(), destFilePath);
    await writeFile(destFilePath, data);
  }
}
