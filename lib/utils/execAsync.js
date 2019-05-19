const { promisify } = require('util');
const { exec } = require('child_process');

module.exports = (cmd, options = {}) => {
  const execAsync = promisify(exec);
  return execAsync(cmd, options);
};
