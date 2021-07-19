import fs from 'fs';
import { promisify } from 'util';
import Path from 'path';

import IConfig from '../IConfig';
import getPkgManagerInstallCmd from '../utils/getPkgManagerInstallCmd';
import subProcess from '../utils/subProcess';

const appendFile = promisify(fs.appendFile);

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
    'eslint-plugin-react',
    'eslint-plugin-react-hooks',
    '@babel/core',
    '@babel/plugin-transform-react-jsx',
    '@babel/preset-env',
    'cross-env',
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
    await appendFile(
      Path.join(destPath, '.yarnrc.yml'),
      'nodeLinker: node-modules'
    );
  }

  if (config.pkgManager === 'yarn-v2-pnp') {
    await appendFile(Path.join(destPath, '.yarnrc.yml'), 'nodeLinker: pnp');
  }

  if (config.bundler && config.bundler === 'rollup') {
    const rollupDeps = ['rollup', '@rollup/plugin-babel'];
    deps.push(...rollupDeps);

    if (config.ts) {
      deps.push('@rollup/plugin-typescript');
    }
  }

  if (config.testRunner && config.testRunner === 'jest') {
    const jestDeps = [
      'jest',
      '@types/jest',
      'eslint-plugin-jest',
      '@testing-library/jest-dom',
      '@testing-library/react',
      '@testing-library/user-event',
    ];
    deps.push(...jestDeps);
  }

  await subProcess(cmd, deps, destPath);
}
