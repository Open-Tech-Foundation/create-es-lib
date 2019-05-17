module.exports = projectName => [
  {
    type: 'list',
    name: 'libType',
    message: 'Library Type',
    choices: ['CLI', 'Module'],
    default: 'CLI',
  },
  {
    type: 'input',
    name: 'packageName',
    message: 'Package Name',
    default: projectName,
  },
  {
    type: 'input',
    name: 'packageDesc',
    message: 'Package Description',
  },
  {
    type: 'input',
    name: 'packageKeywords',
    message: 'Package Keywords (Comma-separated)',
  },
  {
    type: 'input',
    name: 'authorName',
    message: 'Author Name',
  },
  {
    type: 'input',
    name: 'authorEmail',
    message: 'Author Email',
  },
  {
    type: 'input',
    name: 'authorGithubHandle',
    message: 'Author Github Handle',
  },
  {
    type: 'input',
    name: 'repoPath',
    message: 'Repo Path',
    default: hash => `${hash.authorGithubHandle}/${hash.packageName}`,
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
    name: 'packageManager',
    message: 'Package Manager',
    choices: ['npm', 'yarn'],
    default: 'npm',
  },
];
