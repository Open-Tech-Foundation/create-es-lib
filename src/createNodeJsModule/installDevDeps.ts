import { spawn } from 'child_process';

import IConfig from '../IConfig';

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

  const cp = spawn(cmd, deps, { cwd: destPath, shell: true });
  return new Promise((resolve) => {
    cp.stdout.on('data', (data) => {
      console.log(`stdout: ${data}`);
    });

    cp.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    cp.on('close', () => {
      resolve();
    });
  });
}
