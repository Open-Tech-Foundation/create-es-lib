import IConfig from '../IConfig';
import subProcess from '../utils/subProcess';
import getPkgManBinCmd from '../utils/getPkgManBinCmd';

export default async function configTS(
  config: IConfig,
  destPath: string
): Promise<void> {
  const cmd = getPkgManBinCmd(config.pkgManager);
  await subProcess(
    cmd,
    [
      'tsc --init',
      '--target ES2019',
      '--module ESNext',
      '--declaration true',
      `--outDir "./${config.buildDir}"`,
      '--rootDir ./src',
      '--noEmitOnError true',
    ],
    destPath
  );
}
