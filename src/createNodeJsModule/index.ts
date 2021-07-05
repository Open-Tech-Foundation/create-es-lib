import Path from 'path';
import ora from 'ora';

import IConfig from '../IConfig';
import generate from './generate';
import getCurrentDir from '../utils/getCurrentDir';
import installDevDeps from './installDevDeps';

export default async function createNodeJsModule(
  config: IConfig
): Promise<void> {
  const templatePath = Path.join(getCurrentDir(), 'templates', 'nodeJsModule');
  const destPath = Path.join(process.cwd(), config.libName);
  const copySpinner = ora('Creating lib files from templates').start();

  try {
    await generate(templatePath, destPath, config);
    copySpinner.succeed('Created lib files from templates');
  } catch (error) {
    copySpinner.fail('Error in creating files from templates');
    throw error;
  }

  const depsSpinner = ora('Installing dev dependencies').start();
  try {
    await installDevDeps(destPath, config);
    depsSpinner.succeed(`Dev dependencies installed`);
  } catch (error) {
    depsSpinner.fail('Failed to install dev dependencies');
    throw error;
  }
}
