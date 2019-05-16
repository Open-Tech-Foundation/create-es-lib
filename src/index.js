const header = require('./header');
const cmdFlagInfo = require('./cmdFlagInfo');
const generator = require('./generator');

module.exports = () => {
  const cmd = (process.argv.slice(2)[0] || '').trim();

  header();

  if (cmd === '' || cmd.charAt(0) === '-') {
    cmdFlagInfo(cmd);
  } else {
    generator(cmd);
  }
};
