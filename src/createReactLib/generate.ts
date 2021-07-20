import Path from 'path';

import copyTemplates from '../tools/copyTemplates';
import IConfig from '../IConfig';
import { readFile, writeFile } from '../utils/fs';
import compile from '../utils/compile';

async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  await copyTemplates(templatePath, destPath, config, [
    '!**/src/MyComponent.ejs',
  ]);

  const buffer = await readFile(
    Path.join(templatePath, 'src', 'MyComponent.ejs')
  );
  const data = compile(buffer, config);
  const compFileName = config.componentName + (config.ts ? '.tsx' : '.js');
  const destFilePath = Path.join(destPath, 'src', compFileName);
  await writeFile(destFilePath, data);
}

export default generate;
