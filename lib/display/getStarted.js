const chalk = require('chalk');

module.exports = projectPath => {
  console.log(`
    To get started, run:

    $ ${chalk.cyan('cd')} ${projectPath} ${chalk.cyan('&&')} node cli.js
  
  `);
};
