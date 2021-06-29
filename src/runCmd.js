const header = require('./views/header');
const usage = require('./views/usage');
const error = require('./utils/error');
const { version } = require('../package.json');

module.exports = cmd => {
  switch (cmd) {
    case '':
    case '-h':
    case '--help':
      header();
      usage();
      break;
    case '-v':
    case '--version':
      console.log(`v${version}`);
      break;
    default:
      error(`"${cmd}" is not a valid command!`);
  }
};
