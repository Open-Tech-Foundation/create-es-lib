const cmdFlagInfo = require('./display/cmdFlagInfo');
const start = require('./generator/start');
const promptQuestions = require('./generator/promptQuestions');
const success = require('./display/success');
const getStarted = require('./display/getStarted');

module.exports = async () => {
  const cmd = (process.argv.slice(2)[0] || '').trim();

  if (cmd === '' || cmd.charAt(0) === '-') {
    cmdFlagInfo(cmd);
  } else {
    const libName = cmd.split('/').pop();
    const params = await promptQuestions(libName);
    await start(cmd, params);

    // Show getting started info
    console.log('\n');
    success(libName);
    getStarted(cmd, params.libType, params.pkgManager);
  }
};
