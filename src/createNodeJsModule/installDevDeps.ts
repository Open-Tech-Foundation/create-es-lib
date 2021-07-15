import fs from 'fs';
import { promisify } from 'util';
import Path from 'path';

import IConfig from '../IConfig';
import getPkgManagerInstallCmd from '../utils/getPkgManagerInstallCmd';
import subProcess from '../utils/subProcess';

const writeFile = promisify(fs.writeFile);

export default async function installDevDeps(
  destPath: string,
  config: IConfig
): Promise<void> {
  const cmd = getPkgManagerInstallCmd(config.pkgManager);
  const deps = [
    'eslint',
    'prettier',
    'eslint-config-prettier',
    'eslint-plugin-prettier',
  ];

  if (config.ts) {
    const tsDeps = [
      'typescript',
      '@typescript-eslint/parser',
      '@typescript-eslint/eslint-plugin',
    ];
    deps.push(...tsDeps);
  }

  if (config.pkgManager.startsWith('yarn')) {
    await subProcess('yarn', ['set version berry'], destPath);
  }

  if (config.pkgManager === 'yarn-v2-nm') {
    await writeFile(
      Path.join(destPath, '.yarnrc.yml'),
      'nodeLinker: node-modules'
    );
  }

  if (config.pkgManager === 'yarn-v2-pnp') {
    await writeFile(Path.join(destPath, '.yarnrc.yml'), 'nodeLinker: pnp');
  }

  if (config.bundler && config.bundler === 'rollup') {
    const rollupDeps = ['rollup'];
    deps.push(...rollupDeps);

    if (config.ts) {
      deps.push('@rollup/plugin-typescript');
    }
  }

  if (config.testRunner && config.testRunner === 'jest') {
    deps.push('jest', '@types/jest', 'eslint-plugin-jest', 'cross-env');
  }

  await subProcess(cmd, deps, destPath);
}
