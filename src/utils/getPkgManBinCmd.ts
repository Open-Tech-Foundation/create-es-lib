export default function getPkgManBinCmd(pkgManager: string): string {
  const pkgManagerIDs: Record<string, string> = {
    npm: 'npx',
    'yarn-v2-nm': 'yarn',
    'yarn-v2-pnp': 'yarn',
    pnpm: 'pnpmx',
  };

  return pkgManager ? pkgManagerIDs[pkgManager] : 'npx';
}
