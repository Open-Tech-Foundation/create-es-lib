module.exports = name => [
  {
    type: 'list',
    name: 'libType',
    message: 'Libary Type',
    choices: ['CLI', 'Module'],
    default: 'CLI',
  },
  {
    type: 'input',
    name: 'packageName',
    message: 'Package Name',
    default: name,
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
];
