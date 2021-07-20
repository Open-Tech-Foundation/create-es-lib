import Path from 'path';

import copyTemplates from '../tools/copyTemplates';
import IConfig from '../IConfig';
import { mkdir, readFile, writeFile } from '../utils/fs';
import compile from '../utils/compile';
import prettify from '../utils/prettify';

async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  await copyTemplates(templatePath, destPath, config, [
    '!**/src/MyComponent.ejs',
    '!**/jest_spec.ejs',
  ]);

  const buffer = await readFile(
    Path.join(templatePath, 'src', 'MyComponent.ejs')
  );
  const data = compile(buffer, config);
  const compFileName = config.componentName + (config.ts ? '.tsx' : '.js');
  const destFilePath = Path.join(destPath, 'src', compFileName);
  await writeFile(destFilePath, data);

  if (config.testRunner && config.testRunner === 'jest') {
    await mkdir(Path.join(destPath, '__tests__'));
    const buffer = await readFile(Path.join(templatePath, 'jest_spec.ejs'));
    let data = compile(buffer, { ...config });
    const destFilePath = Path.join(
      destPath,
      '__tests__',
      config.componentName + '.spec.js'
    );
    data = prettify(data.toString(), destFilePath);
    await writeFile(destFilePath, data);
  }
}

export default generate;
