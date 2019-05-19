const chalk = require('chalk');
const emoji = require('node-emoji');

module.exports = libName => {
  console.log(
    '\t',
    emoji.get('tada'),
    `Your library "${chalk.bold.green(
      libName,
    )}" has been created successfully!`,
  );
};
