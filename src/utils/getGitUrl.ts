import IConfig from '../IConfig';

export default function getGitUrl(config: IConfig): string {
  if (!config.gitProvider) {
    return '';
  }

  const gitProviderUrl: Record<string, string> = {
    github: 'https://github.com',
  };

  if (config.pkgScope) {
    return (
      gitProviderUrl[config.gitProvider] +
      '/' +
      config.pkgScope +
      '/' +
      config.libName +
      '.git'
    );
  }

  return (
    gitProviderUrl[config.gitProvider] +
    '/' +
    config.gitProviderUsername +
    '/' +
    config.libName +
    '.git'
  );
}
