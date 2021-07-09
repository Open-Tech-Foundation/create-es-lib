import IConfig from '../IConfig';
import subProcess from '../utils/subProcess';

export default async function commitToGit(
  config: IConfig,
  destPath: string
): Promise<void> {
  await subProcess('git', ['init'], destPath);
  await subProcess('git', ['checkout', '-b', 'main'], destPath);
  await subProcess(
    'git',
    ['config', '--local', 'user.name', `"${config.authorFullName}"`],
    destPath
  );
  await subProcess(
    'git',
    ['config', '--local', 'user.email', config.authorEmail],
    destPath
  );
  await subProcess('git', ['add', '--all'], destPath);
  await subProcess('git', ['commit', `-m "${config.commitMsg}"`], destPath);
}
