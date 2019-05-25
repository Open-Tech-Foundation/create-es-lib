const path = require('path');
const { existsSync } = require('fs');
const { tmpdir } = require('os');

const createLib = require('../lib/generator/createLib');

describe('When invalid params passed', () => {
  test('the empty params fails with an error', async () => {
    expect.assertions(1);
    await expect(createLib('', {})).rejects.toThrow();
  });

  test('the invalid lib type fails with an error', async () => {
    expect.assertions(1);
    await expect(createLib('', { libType: 'browser' })).rejects.toThrow();
  });
});

describe('When valid params passed', () => {
  it('creates a cli lib', async () => {
    expect.assertions(1);
    const projectPath = `${path.join(tmpdir(), 'cool-lib-cli')}`;
    const params = {
      libType: 'CLI',
      pkgName: 'cool-lib-cli',
      pkgManager: { cmd: 'npm', exe: 'npx' },
    };
    await createLib(projectPath, params);
    expect(existsSync(projectPath)).toBeTruthy();
  });

  it('creates a module lib', async () => {
    expect.assertions(1);
    const projectPath = `${path.join(tmpdir(), 'cool-lib-mod')}`;
    const params = {
      libType: 'module',
      pkgName: 'cool-lib-mod',
      pkgManager: { cmd: 'npm', exe: 'npx' },
    };
    await createLib(projectPath, params);
    expect(existsSync(projectPath)).toBeTruthy();
  });
});
