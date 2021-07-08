export default function getPkgManagerInstallCmd(pkgManager: string): string {
  const pkgManagerIDs: Record<string, string> = {
    npm: 'npm install --save-dev',
    'yarn-v2-nm': 'yarn add --dev',
    'yarn-v2-pnp': 'yarn add --dev',
    pnpm: 'pnpm add --save-dev',
  };

  return pkgManagerIDs[pkgManager];
}
