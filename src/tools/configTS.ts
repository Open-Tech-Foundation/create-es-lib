import IConfig from '../IConfig';
import subProcess from '../utils/subProcess';
import getPkgManBinCmd from '../utils/getPkgManBinCmd';

export default async function configTS(
  config: IConfig,
  destPath: string
): Promise<void> {
  const cmd = getPkgManBinCmd(config.pkgManager);
  const args = [
    'tsc --init',
    '--target ES2019',
    '--module ESNext',
    '--declaration true',
    `--outDir "./${config.buildDir}"`,
    '--rootDir ./src',
    '--noEmitOnError true',
    '--moduleResolution node',
  ];

  if (config.libType === 'react') {
    args.push('--jsx react-jsx');
  }

  await subProcess(cmd, args, destPath);
}
