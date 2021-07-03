import chalk from 'chalk';
import yargs from 'yargs';
import inquirer from 'inquirer';

import createNodeJsModule from './createNodeJsModule';
import IConfig from './IConfig';

async function getLibType() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'libType',
      message: 'Select a library type',
      choices: ['Browser', 'Node.js CLI', 'Node.js Module'],
      default: 'Browser',
    },
  ]);

  return answer.libType;
}

async function getLibName() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'libName',
      message: 'Enter library name',
      default: '',
      validate: (input) => {
        if (!input) {
          return 'Please enter a valid library name';
        }
        return true;
      },
    },
  ]);

  return answer.libName;
}

async function getTypeScriptSupport() {
  const answer = await inquirer.prompt([
    {
      type: 'confirm',
      name: 'ts',
      message: 'Do you need TypeScript support',
      default: true,
    },
  ]);

  return answer.ts;
}

async function getPkgManager() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'pkgManager',
      message: 'Select a package manager',
      choices: [
        { name: 'Npm', value: 'npm' },
        { name: 'Yarn (Classic)', value: 'yarn-v1' },
        { name: 'Yarn Berry (Node Modules)', value: 'yarn-v2-nm' },
        { name: 'Yarn Berry (PnP)', value: 'yarn-v2-pnp' },
        { name: 'pnpm', value: 'pnpm', disabled: true },
      ],
      default: 'npm',
    },
  ]);

  return answer.pkgManager;
}

function createLib(config: IConfig) {
  switch (config.libType) {
    case 'Browser':
      console.log('Not implemented yet');
      break;
    case 'Node.js CLI':
      console.log('Not implemented yet');
      break;
    case 'Node.js Module':
      createNodeJsModule(config);
      break;
  }
}

async function run(libName: string | unknown) {
  const config: Partial<IConfig> = {};
  if (libName) {
    config.libName = libName as string;
  } else {
    config.libName = await getLibName();
  }

  config.libType = await getLibType();
  config.ts = await getTypeScriptSupport();
  config.pkgManager = await getPkgManager();
  createLib(config as IConfig);
}

export default function Create(): void {
  const header = chalk`\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\n`;
  console.log(header);

  yargs
    .scriptName('create-es-lib')
    .usage('$0 <your-lib-name>')
    .command('$0 [libName]', '', {}, (argv) => {
      run(argv.libName);
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .help().argv;
}
