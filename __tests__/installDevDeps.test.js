const path = require('path');
const { tmpdir } = require('os');
const { readFileSync } = require('fs');
const rmfr = require('rmfr');

const createLib = require('../lib/generator/createLib');
const installDevDeps = require('../lib/generator/installDevDeps');
const devPkgs = require('../lib/generator/devPkgs');

describe('use dev packages.json file to install dev deps', () => {
  it('uses npm to install cli lib dev deps', async () => {
    expect.assertions(1);
    const projectPath = `${path.join(tmpdir(), 'cool-lib-cli')}`;
    const params = {
      libType: 'CLI',
      pkgName: 'cool-lib-cli',
      pkgManager: { cmd: 'npm', exe: 'npx' },
    };
    await createLib(projectPath, params);
    await installDevDeps(projectPath, params.libType, params.pkgManager);
    const rawdata = readFileSync(path.join(projectPath, 'package.json'));
    const packageData = JSON.parse(rawdata);
    expect(Object.keys(packageData.devDependencies)).toEqual([
      ...devPkgs.common,
      ...devPkgs.cli,
    ]);
    await rmfr(projectPath);
  }, 10000);

  it('uses yarn to install module lib dev deps', async () => {
    expect.assertions(1);
    const projectPath = `${path.join(tmpdir(), 'cool-lib-mod')}`;
    const params = {
      libType: 'module',
      pkgName: 'cool-lib-mod',
      pkgManager: { cmd: 'yarn', exe: 'yarn' },
    };
    await createLib(projectPath, params);
    await installDevDeps(projectPath, params.libType, params.pkgManager);
    const rawdata = readFileSync(path.join(projectPath, 'package.json'));
    const packageData = JSON.parse(rawdata);
    expect(Object.keys(packageData.devDependencies)).toEqual([
      ...devPkgs.common,
      ...devPkgs.module,
    ]);
    await rmfr(projectPath);
  }, 10000);
});
