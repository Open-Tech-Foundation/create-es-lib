const execa = require('execa');
const pEachSeries = require('p-each-series');
const { writeFile } = require('fs');
const path = require('path');
const { promisify } = require('util');

const writeFileAsync = promisify(writeFile);

const gitIgnoreContent = `
# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Coverage directory used by tools like istanbul
coverage

# nyc test coverage
.nyc_output

# Dependency directories
node_modules/
jspm_packages/

# TypeScript v1 declaration files
typings/

# Optional npm cache directory
.npm

# Optional eslint cache
.eslintcache
`;

module.exports = async (params, cwd) => {
  await writeFileAsync(path.join(cwd, '.gitignore'), gitIgnoreContent);
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
