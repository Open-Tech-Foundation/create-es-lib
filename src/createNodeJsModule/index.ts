import Path from 'path';

import ora from 'ora';

import IBasicConfig from '../IBasicConfig';
import generate from './generate';

export default async function createNodeJsModule(
  basicConfig: IBasicConfig
): Promise<void> {
  const templatePath = Path.join(__dirname, 'templates', 'nodeJsModule');
  const copySpinner = ora('Creating lib files from templates').start();
  try {
    await generate(templatePath, basicConfig);
    copySpinner.succeed('Created lib files from templates');
  } catch (error) {
    copySpinner.fail('Error in creating files from templates');
    process.exit(1);
  }
}
