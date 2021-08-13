import Path from 'path';
import { cliProgress } from '@open-tech-world/node-cli-progress';
import { camelCase } from '@open-tech-world/es-utils';

import IConfig from '../IConfig';
import getCurrentDir from '../utils/getCurrentDir';
import installDevDeps from './installDevDeps';
import getPkgNameWithScope from '../utils/getPkgNameWithScope';
import commitToGit from '../tools/commitToGit';
import getGitUrl from '../utils/getGitUrl';
import getStarted from './getStarted';
import configTS from '../tools/configTS';
import generate from './generate';

export default async function createNodeJsModule(
  config: IConfig
): Promise<void> {
  config = {
    ...config,
    pkgName: camelCase(config.libName),
    pkgNameWithScope: getPkgNameWithScope(config.libName, config.pkgScope),
    gitUrl: getGitUrl(config),
  };
  const templatePath = Path.join(getCurrentDir(), 'templates', 'nodeJsModule');
  const destPath = Path.join(process.cwd(), config.libName);
  const copyTask = new cliProgress();
  copyTask.start('Creating lib files from templates');

  try {
    await generate(templatePath, destPath, config);
    copyTask.done('Created lib files from templates');
  } catch (error) {
    copyTask.fail('Error in creating files from templates');
    throw error;
  }

  if (config.pkgManager) {
    const depsTask = new cliProgress();
    depsTask.start('Installing dev dependencies');
    try {
      await installDevDeps(destPath, config);
      depsTask.done(`Dev dependencies installed`);
    } catch (error) {
      depsTask.fail('Failed to install dev dependencies');
      throw error;
    }
  }

  if (config.pkgManager && config.ts) {
    const tsTask = new cliProgress();
    tsTask.start('Initializing typescript configuration');
    try {
      await configTS(config, destPath);
      tsTask.done(`Initialized typescript configuration`);
    } catch (error) {
      tsTask.fail('Failed initialize typescript configuration');
      throw error;
    }
  }

  if (config.gitProvider) {
    const gitTask = new cliProgress();
    gitTask.start('Commiting to git');
    try {
      await commitToGit(config, destPath);
      gitTask.done(`Files commited to git`);
    } catch (error) {
      gitTask.fail('Git commit failed');
      throw error;
    }
  }

  await getStarted(config);
}
