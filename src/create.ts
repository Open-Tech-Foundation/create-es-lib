import chalk from 'chalk';
// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers';
import { Command } from 'commander';
import inquirer from 'inquirer';
import emailRegex from 'email-regex';

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
        { name: 'pnpm', value: 'pnpm', disabled: true },
        { name: 'Yarn - Classic', value: 'yarn-v1' },
        { name: 'Yarn - Berry (Node Modules)', value: 'yarn-v2-nm' },
        { name: 'Yarn - Berry (PnP)', value: 'yarn-v2-pnp' },
      ],
      default: 'npm',
    },
  ]);

  return answer.pkgManager;
}

async function getPkgScope() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'pkgScope',
      message: 'Enter package scope (For scoped packages only)',
      default: '',
    },
  ]);

  return answer.pkgScope;
}

async function getAuthorFullName() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'authorFullName',
      message: 'Enter author fullname',
      default: '',
    },
  ]);

  return answer.authorFullName;
}

async function getAuthorEmail() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Enter author email',
      default: '',
      validate: (input) => {
        if (emailRegex({ exact: true }).test(input)) return true;
        return 'Please enter a valid email address';
      },
    },
  ]);

  return answer.authorEmail;
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

async function run(libName: string | undefined) {
  const config: Partial<IConfig> = {};
  if (libName) {
    config.libName = libName as string;
  } else {
    config.libName = await getLibName();
  }

  config.libType = await getLibType();
  config.ts = await getTypeScriptSupport();
  config.pkgManager = await getPkgManager();
  config.pkgScope = await getPkgScope();
  config.authorFullName = await getAuthorFullName();
  config.authorEmail = await getAuthorEmail();
  createLib(config as IConfig);
}

export default function create(): void {
  const header = chalk`\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\n`;
  console.log(header);

  const program = new Command();
  program
    .name('create-es-lib')
    .description('Create Modern ES Library.')
    .version('0.1.0', '-v, --version')
    .argument('[libName]')
    .action((libName) => {
      run(libName);
    });
  program.parse(process.argv);
}
