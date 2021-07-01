import chalk from 'chalk';
import yargs from 'yargs';
import inquirer from 'inquirer';
import createNodeJsModule from './createNodeJsModule';

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
      validate: input => {
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

function createLib(libName: string, libType: string) {
  switch (libType) {
    case 'Browser':
      console.log('Not implemented yet');
      break;
    case 'Node.js CLI':
      console.log('Not implemented yet');
      break;
    case 'Node.js Module':
      createNodeJsModule(libName);
      break;
  }
}

export default function Create() {
  const header = chalk`\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\n`;
  console.log(header);

  const argv = yargs
    .scriptName('create-es-lib')
    .usage('$0 <your-lib-name>')
    .command('$0 [libName]', '', {}, async argv => {
      const basicConfig: Record<string, unknown> = {};

      if (argv.libName) {
        basicConfig.libName = argv.libName;
      } else {
        basicConfig.libName = await getLibName();
      }

      basicConfig.libType = await getLibType();
      basicConfig.ts = await getTypeScriptSupport();
      console.log(basicConfig);
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .help().argv;
}
