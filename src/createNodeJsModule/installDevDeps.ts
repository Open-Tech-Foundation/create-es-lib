import { writeFile } from 'fs/promises';
import Path from 'path';

import IConfig from '../IConfig';
import subProcess from '../utils/subProcess';

function getPkgManagerCmd(pkgManager: string): string {
  const pkgManagerIDs: Record<string, string> = {
    npm: 'npm install --save-dev',
    'yarn-v2-nm': 'yarn add --dev',
    'yarn-v2-pnp': 'yarn add --dev',
    pnpm: 'pnpm add --save-dev',
  };

  return pkgManagerIDs[pkgManager];
}

export default async function installDevDeps(
  destPath: string,
  config: IConfig
): Promise<void> {
  const cmd = getPkgManagerCmd(config.pkgManager);
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
    deps.push('jest', '@types/jest', 'eslint-plugin-jest');
  }

  await subProcess(cmd, deps, destPath);
}
