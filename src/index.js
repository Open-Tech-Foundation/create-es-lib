const header = require('./header');
const cmdFlagInfo = require('./cmdFlagInfo');

module.exports = () => {
  header();
  const cmd = (process.argv.slice(2)[0] || '').trim();

  if (cmd === '' || cmd.charAt(0) === '-') {
    cmdFlagInfo(cmd);
  } else {
    console.log('Generator');
  }
};
