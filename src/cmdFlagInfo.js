const header = require('./header');
const usage = require('./usage');
const error = require('./utils/error');

module.exports = (cmd) => {
  switch (cmd) {
    case '':
    case '-h':
    case '--help':
      header();
      usage();
      break;
    case '-v':
    case '--version':
      header();
      break;
    default:
      header();
      error(`"${cmd}" is not a valid command!`);
  }
};
