import chalk from 'chalk';
import IConfig from '../IConfig';
import getPkgManagerRunCmd from '../utils/getPkgManagerRunCmd';

export default async function getStarted(config: IConfig): Promise<void> {
  return new Promise((resolve) => {
    console.log('📦 Done!');
    console.log('');
    console.log(
      `Your new React library ${chalk.green(config.libName)} has been created.`
    );
    console.log('');
    console.log('Run the following commands to get started 🚀');
    console.log('');
    console.log(chalk.blueBright(`\t$ cd ${config.libName}`));
    console.log('\t - Change directory');
    console.log('');
    console.log(
      chalk.blueBright(`\t$ ${getPkgManagerRunCmd(config.pkgManager)} start`)
    );
    console.log(
      '\t - If you enabled a bundler/compiler, then this will build your lib for development environment with watch mode.'
    );
    console.log('');
    console.log(
      chalk.blueBright(`\t$ ${getPkgManagerRunCmd(config.pkgManager)} build`)
    );
    console.log(
      '\t - If you enabled a bundler/compiler, then this will build your lib for production environment.'
    );
    console.log('');
    console.log(
      chalk.blueBright(`\t$ ${getPkgManagerRunCmd(config.pkgManager)} test`)
    );
    console.log(
      '\t - If you enabled a test runner, then this will run your tests.'
    );
    console.log('');
    resolve();
  });
}
