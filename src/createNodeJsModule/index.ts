import Path from 'path';

import ora from 'ora';

import IConfig from '../IConfig';
import generate from './generate';

export default async function createNodeJsModule(
  config: IConfig
): Promise<void> {
  const templatePath = Path.join(__dirname, 'templates', 'nodeJsModule');
  const copySpinner = ora('Creating lib files from templates').start();
  try {
    await generate(templatePath, config);
    copySpinner.succeed('Created lib files from templates');
  } catch (error) {
    copySpinner.fail('Error in creating files from templates');
    process.exit(1);
  }
}
