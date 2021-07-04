import { exec } from 'child_process';
import { promisify } from 'util';

import IConfig from '../IConfig';

const aexec = promisify(exec);

function getPkgManagerCmd(pkgManager: string): string {
  const pkgManagerIDs: Record<string, string> = {
    npm: 'npm install --save-dev',
    'yarn-v1': 'yarn add --dev',
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

  await aexec(`${cmd} ${deps.join(' ')}`, { cwd: destPath });
}
