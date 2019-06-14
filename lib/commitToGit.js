const execa = require('execa');
const pEachSeries = require('p-each-series');

module.exports = async (params, cwd) => {
  const commands = [
    'git init && git add --all',
    `git config --local user.name "${params.authorFullName}"`,
    `git config --local user.email "${params.authorEmail}"`,
    `git commit -m "Initial commit"`,
  ];
  return pEachSeries(commands, async cmd => {
    return execa(cmd, { cwd, shell: true });
  });
};
