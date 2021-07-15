export default function getPkgManagerRunCmd(pkgManager: string): string {
  const pkgManagerIDs: Record<string, string> = {
    npm: 'npm run',
    'yarn-v2-nm': 'yarn',
    'yarn-v2-pnp': 'yarn',
    pnpm: 'pnpm run',
  };

  return pkgManager ? pkgManagerIDs[pkgManager] : 'npm run';
}
