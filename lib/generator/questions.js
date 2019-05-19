const validateNpmPkgName = require('validate-npm-package-name');
const emailRegex = require('email-regex');

module.exports = libName => [
  {
    type: 'list',
    name: 'libType',
    message: 'Library Type',
    choices: ['CLI', 'Module'],
    default: 'CLI',
  },
  {
    type: 'input',
    name: 'pkgName',
    message: 'Package Name',
    default: libName,
    validate: input => {
      const result = validateNpmPkgName(input).validForNewPackages;
      return result || 'Invalid package name';
    },
  },
  {
    type: 'input',
    name: 'pkgDesc',
    message: 'Package Description',
    default: 'Description',
  },
  {
    type: 'input',
    name: 'pkgKeywords',
    message: 'Package Keywords (Comma-separated)',
  },
  {
    type: 'input',
    name: 'authorFullName',
    message: 'Author Full Name',
    validate: input => (input.length > 1 ? true : '*Required'),
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'Author Email',
    validate: input =>
      emailRegex({ exact: true }).test(input) ? true : 'Invalid email',
  },
  {
    type: 'input',
    name: 'authorGithubHandle',
    message: 'Author Github Handle',
    validate: input => (input.length > 1 ? true : '*Required'),
  },
  {
    type: 'input',
    name: 'authorWebsite',
    message: 'Author Website',
    default: hash => `${hash.authorGithubHandle}.github.io`,
  },
  {
    type: 'input',
    name: 'repoPath',
    message: 'Repo Path',
    default: hash => `${hash.authorGithubHandle}/${hash.pkgName}`,
  },
  {
    type: 'list',
    name: 'license',
    message: 'License',
    choices: ['MIT', 'Other'],
    default: 'MIT',
  },
  {
    type: 'list',
    name: 'pkgManager',
    message: 'Package Manager',
    choices: [
      { name: 'npm', value: { cmd: 'npm', exe: 'npx' } },
      { name: 'yarn', value: { cmd: 'yarn', exe: 'yarn' } },
    ],
    default: { name: 'npm', value: { cmd: 'npm', exe: 'npx' } },
  },
  {
    type: 'confirm',
    name: 'eslintInit',
    message: 'Would you like to config eslint now?',
  },
];
