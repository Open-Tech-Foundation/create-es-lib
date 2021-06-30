import chalk from 'chalk';
import yargs from 'yargs';
import inquirer from 'inquirer';

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
          return 'Please enter a valid library name'
        }
        return true
      }
    },
  ]);

  return answer.libName;
}

function createLib(libName: string, libType: string) {
  console.log(libName, libType);
}

export default function Create() {
  const header = chalk`\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\n`;
  console.log(header);

  const argv = yargs
    .scriptName('create-es-lib')
    .usage('$0 <your-lib-name>')
    .command('$0 [libName]', '', {}, async argv => {
      if (argv.libName) {
        const libType = await getLibType();
        createLib(libType, argv.libName as string);
      } else {
        const libName = await getLibName()
        const libType = await getLibType();
        createLib(libType, libName);
      }
    })
    .alias('h', 'help')
    .alias('v', 'version')
    .help().argv;
}
