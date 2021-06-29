const chalk = require('chalk');

module.exports = message => {
  console.error(chalk.red(message));
  process.exit(1);
};
