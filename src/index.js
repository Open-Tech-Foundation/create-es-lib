const header = require('./header');
const cmdFlagInfo = require('./cmdFlagInfo');
const Generator = require('./generator');

module.exports = () => {
  const cmd = (process.argv.slice(2)[0] || '').trim();

  header();

  if (cmd === '' || cmd.charAt(0) === '-') {
    cmdFlagInfo(cmd);
  } else {
    const g = new Generator(cmd);
    g.start();
  }
};
