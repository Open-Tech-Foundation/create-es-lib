const execa = require('execa');

const devPkgs = require('./devPkgs.json');

module.exports = async (cwd, libType, pkgManager) => {
  const cliDevPkgs = [...devPkgs.common, ...devPkgs.cli].join(' ');
  const moduleDevPkgs = [...devPkgs.common, ...devPkgs.module].join(' ');
  const pkgs = libType === 'CLI' ? cliDevPkgs : moduleDevPkgs;
  let cmd;

  if (pkgManager.cmd === 'npm') {
    cmd = `npm install --save-dev ${pkgs}`;
  } else {
    cmd = `yarn add ${pkgs} --dev`;
  }

  return execa(cmd, {
    cwd,
    stdio: 'ignore',
    shell: true,
  });
};
