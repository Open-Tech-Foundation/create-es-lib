import chalk from 'chalk';
import yargs from 'yargs';

export default function Create() {
  const header = chalk`\n{bold.rgb(255, 136, 0) @open-tech-world/create-es-lib}\n`;
  console.log(header);

  const argv = yargs
    .scriptName('create-es-lib')
    .usage('$0 <your-lib-name>')
    .alias('h', 'help')
    .alias('v', 'version')
    .help().argv;
}

