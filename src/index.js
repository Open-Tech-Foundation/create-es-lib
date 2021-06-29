const runCmd = require('./runCmd');
const start = require('./start');

module.exports = async () => {
  const args = process.argv.slice(2);
  const cmd = (args[0] || '').trim();

  if (cmd === '' || cmd.charAt(0) === '-') {
    runCmd(cmd);
  } else {
    start(cmd, args.slice(1));
  }
};
