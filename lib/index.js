const path = require('path');

const cmdFlagInfo = require('./display/cmdFlagInfo');
const createLib = require('./generator/createLib');
const promptQuestions = require('./generator/promptQuestions');
const success = require('./display/success');
const getStarted = require('./display/getStarted');
const error = require('./utils/error');

module.exports = async () => {
  const cmd = (process.argv.slice(2)[0] || '').trim();

  if (cmd === '' || cmd.charAt(0) === '-') {
    cmdFlagInfo(cmd);
  } else {
    const libName = cmd.split('/').pop();
    const params = await promptQuestions(libName);

    // Create library
    try {
      const destPath = path.join(process.cwd(), cmd);
      await createLib(destPath, params);
    } catch (err) {
      error(err.message);
    }

    // Show getting started info
    console.log('\n');
    success(libName);
    getStarted(cmd, params.libType, params.pkgManager);
  }
};
