const runCmd = require('./runCmd');
const start = require('./start');

module.exports = async () => {
  const cmd = (process.argv.slice(2)[0] || '').trim();

  if (cmd === '' || cmd.charAt(0) === '-') {
    runCmd(cmd);
  } else {
    start(cmd);
  }
};
