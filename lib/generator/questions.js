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
    name: 'packageName',
    message: 'Package Name',
    default: libName,
  },
  {
    type: 'input',
    name: 'packageDesc',
    message: 'Package Description',
    default: 'Description',
  },
  {
    type: 'input',
    name: 'packageKeywords',
    message: 'Package Keywords (Comma-separated)',
  },
  {
    type: 'input',
    name: 'authorFullName',
    message: 'Author Full Name',
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
    name: 'authorWebsite',
    message: 'Author Website',
    default: hash => `${hash.authorGithubHandle}.github.io`,
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
    choices: [
      { name: 'npm', value: { cmd: 'npm', exe: 'npx' } },
      { name: 'yarn', value: { cmd: 'yarn', exe: 'yarn' } },
    ],
    default: { name: 'npm', value: { cmd: 'npm', exe: 'npx' } },
  },
];
