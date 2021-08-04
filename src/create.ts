import { style } from '@open-tech-world/es-cli-styles';
import { Command } from 'commander';
import inquirer from 'inquirer';
import { isEmail } from '@open-tech-world/es-utils';
import { readFileSync } from 'fs';
import Path from 'path';

import createNodeJsModule from './createNodeJsModule';
import IConfig from './IConfig';
import getCurrentDir from './utils/getCurrentDir';
import createReactLib from './createReactLib';

const packagePath = Path.join(getCurrentDir(), '..', 'package.json');
const packageJson = JSON.parse(readFileSync(packagePath, { encoding: 'utf8' }));
const VERSION = packageJson.version;

async function getLibType() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'libType',
      message: 'Select a library type',
      choices: [
        { name: 'Browser', value: 'browser', disabled: true },
        { name: 'Node.js CLI', value: 'node_cli', disabled: true },
        { name: 'Node.js Module', value: 'node_mod' },
        { name: 'React', value: 'react' },
      ],
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

async function getLic() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'lic',
      message: 'Choose a license',
      choices: [
        { name: 'None', value: null },
        { name: 'Apache License 2.0', value: 'Apache-2.0' },
        {
          name: 'BSD 3-Clause "New" or "Revised" License',
          value: 'BSD-3-Clause',
        },
        {
          name: 'GNU General Public License v3.0 or later',
          value: 'GPL-3.0-or-later',
        },
        { name: 'MIT License', value: 'MIT' },
      ],
      default: 'None',
    },
  ]);

  return answer.lic;
}

async function getPkgManager() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'pkgManager',
      message: 'Select a package manager',
      choices: [
        { name: 'None', value: null },
        { name: 'Npm', value: 'npm' },
        { name: 'pnpm', value: 'pnpm', disabled: true },
        { name: 'Yarn - Berry (Node Modules)', value: 'yarn-v2-nm' },
        { name: 'Yarn - Berry (PnP)', value: 'yarn-v2-pnp' },
      ],
      default: 'npm',
    },
  ]);

  return answer.pkgManager;
}

async function getBundler() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'bundler',
      message: 'Select a module bundler',
      choices: [
        { name: 'None', value: null },
        { name: 'Rollup', value: 'rollup' },
        { name: 'Webpack', value: 'webpack', disabled: true },
      ],
      default: null,
    },
  ]);

  return answer.bundler;
}

async function getGitProvider() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'gitProvider',
      message: 'Select a git hosting provider',
      choices: [
        { name: 'None', value: null },
        { name: 'Bitbucket', value: 'bitbucket', disabled: true },
        { name: 'GitHub', value: 'github' },
        { name: 'GitLab', value: 'gitlab', disabled: true },
      ],
      default: null,
    },
  ]);

  return answer.gitProvider;
}

async function getTestRunner() {
  const answer = await inquirer.prompt([
    {
      type: 'list',
      name: 'testRunner',
      message: 'Select a test runner/framework',
      choices: [
        { name: 'None', value: null },
        { name: 'AVA', value: 'ava', disabled: true },
        { name: 'Jasmine', value: 'jasmine', disabled: true },
        { name: 'Jest', value: 'jest' },
        { name: 'Karma', value: 'karma', disabled: true },
        { name: 'Mocha', value: 'mocha', disabled: true },
        { name: 'QUnit', value: 'qunit', disabled: true },
        { name: 'Tap', value: 'tap', disabled: true },
      ],
      default: null,
    },
  ]);

  return answer.testRunner;
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
      validate: (input) => {
        if (!input) {
          return 'Please enter author fullname';
        }
        return true;
      },
    },
  ]);

  return answer.authorFullName;
}

async function getGitProiderUsername(provider: string) {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'gitProviderUsername',
      message: `Enter ${provider} username`,
      default: '',
      validate: (input) => {
        if (!input) {
          return 'Please enter valid username';
        }
        return true;
      },
    },
  ]);

  return answer.gitProviderUsername;
}

async function getCommitMsg() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'commitMsg',
      message: 'Enter initial commit message',
      default: 'Initial commit',
      validate: (input) => {
        if (!input) {
          return 'Please enter valid commit msg';
        }
        return true;
      },
    },
  ]);

  return answer.commitMsg;
}

async function getBuildDir() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'buildDir',
      message: 'Enter build dir (lib | build | dist)',
      default: 'lib',
      validate: (input) => {
        if (!input) {
          return 'Please enter a valid build dir';
        }
        return true;
      },
    },
  ]);

  return answer.buildDir;
}

async function getAuthorEmail() {
  const answer = await inquirer.prompt([
    {
      type: 'input',
      name: 'authorEmail',
      message: 'Enter author email',
      default: '',
      validate: (input) => {
        if (isEmail(input)) return true;
        return 'Please enter a valid email address';
      },
    },
  ]);

  return answer.authorEmail;
}

function createLib(config: IConfig) {
  switch (config.libType) {
    case 'browser':
      console.log('Not implemented yet');
      break;
    case 'node_cli':
      console.log('Not implemented yet');
      break;
    case 'node_mod':
      createNodeJsModule(config);
      break;
    case 'react':
      createReactLib(config);
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
  config.lic = await getLic();
  config.bundler = await getBundler();
  config.buildDir = await getBuildDir();
  config.testRunner = await getTestRunner();
  config.gitProvider = await getGitProvider();
  if (config.gitProvider) {
    config.gitProviderUsername = await getGitProiderUsername(
      config.gitProvider
    );
    config.commitMsg = await getCommitMsg();
  }
  config.year = new Date().getFullYear();
  createLib(config as IConfig);
}

export default function create(): void {
  const header = style('~orange.bold{\n@open-tech-world/create-es-lib}\n');
  console.log(header);

  try {
    const program = new Command();
    program
      .name('create-es-lib')
      .description('Create Modern ES Library.')
      .version(VERSION, '-v, --version')
      .argument('[libName]')
      .action((libName) => {
        run(libName);
      });
    program.parse(process.argv);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
