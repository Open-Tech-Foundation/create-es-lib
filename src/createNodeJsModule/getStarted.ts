import { style } from '@open-tech-world/es-cli-styles';
import IConfig from '../IConfig';
import getPkgManagerRunCmd from '../utils/getPkgManagerRunCmd';

export default async function getStarted(config: IConfig): Promise<void> {
  return new Promise((resolve) => {
    console.log('📦 Done!');
    console.log();
    console.log(
      style(`Your new library ~green.bold{${config.libName}} has been created.`)
    );
    console.log();
    console.log('Run the following commands to get started 🚀');
    console.log();
    console.log(style(`\t$ ~aqua.bold{cd ${config.libName}}`));
    console.log(style('\t ~gray.dim{- Change directory}'));
    console.log();
    console.log(
      style(`\t$ ~aqua.bold{${getPkgManagerRunCmd(config.pkgManager)} start}`)
    );
    console.log(
      style(
        '\t ~gray.dim{- If you enabled a bundler/compiler, then this will build your lib for development environment with watch mode.}'
      )
    );
    console.log();
    console.log(
      style(`\t$ ~aqua.bold{${getPkgManagerRunCmd(config.pkgManager)} build}`)
    );
    console.log(
      style(
        '\t ~gray.dim{- If you enabled a bundler/compiler, then this will build your lib for production environment.}'
      )
    );
    console.log();
    console.log(
      style(`\t$ ~aqua.bold{${getPkgManagerRunCmd(config.pkgManager)} test}`)
    );
    console.log(
      style(
        '\t ~gray.dim{- If you enabled a test runner, then this will run your tests.}'
      )
    );
    console.log();
    resolve();
  });
}
