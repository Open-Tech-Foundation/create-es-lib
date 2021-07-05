import process from 'process';
import Os from 'os';
import { jest } from '@jest/globals';
import fg from 'fast-glob';

import { createNodeJsModule } from '../lib/createESLib.js';
import { existsSync, rmdirSync } from 'fs';
import path from 'path';

const tempDir = Os.tmpdir();
const myLibPath = path.join(tempDir, 'my-lib');
let ConsoleError;

beforeAll(() => {
  rmdirSync(path.join(tempDir, 'my-lib'), { recursive: true });
});

beforeEach(() => {
  const cwdSpy = jest.spyOn(process, 'cwd');
  cwdSpy.mockReturnValue(tempDir);
  ConsoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  // rmdirSync(path.join(tempDir, 'my-lib'), { recursive: true });
});

describe('createNodeJsModule', () => {
  it('creates a js lib with npm', async () => {
    const config = {
      libName: 'my-lib',
      ts: false,
      authorFullName: 'tg',
      authorEmail: 'a@a',
      pkgManager: 'npm',
    };
    await createNodeJsModule(config);
    expect(ConsoleError).not.toHaveBeenCalled();
    expect(existsSync(myLibPath)).toBeTruthy();
    const files = fg.sync(['my-lib/**', '!my-lib/node_modules'], {
      dot: true,
      cwd: tempDir,
    });
    expect(files.length).toBe(8);
    expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'node_modules'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'package-lock.json'))).toBeTruthy();
  }, 50000);

  it('creates a js lib with yarn v2 node_modules', async () => {
    const config = {
      libName: 'my-lib',
      ts: false,
      authorFullName: 'tg',
      authorEmail: 'a@a',
      pkgManager: 'yarn-v2-nm',
    };
    await createNodeJsModule(config);
    expect(ConsoleError).not.toHaveBeenCalled();
    expect(existsSync(myLibPath)).toBeTruthy();
    const files = fg.sync(
      ['my-lib/**', '!my-lib/.yarn', '!my-lib/node_modules'],
      {
        dot: true,
        cwd: tempDir,
      }
    );
    expect(files.length).toBe(9);
    expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'node_modules'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'package-lock.json'))).toBeFalsy();
  }, 50000);

  it('creates a js lib with yarn v2 pnp', async () => {
    const config = {
      libName: 'my-lib',
      ts: false,
      authorFullName: 'tg',
      authorEmail: 'a@a',
      pkgManager: 'yarn-v2-pnp',
    };
    await createNodeJsModule(config);
    expect(ConsoleError).not.toHaveBeenCalled();
    expect(existsSync(myLibPath)).toBeTruthy();
    const files = fg.sync(['my-lib/**', '!my-lib/.yarn'], {
      dot: true,
      cwd: tempDir,
    });
    expect(files.length).toBe(10);
    expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'node_modules'))).toBeFalsy();
    expect(existsSync(path.join(myLibPath, 'yarn.lock'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'package-lock.json'))).toBeFalsy();
    expect(existsSync(path.join(myLibPath, '.pnp.cjs'))).toBeTruthy();
  }, 50000);

  it.only('creates a js lib with Apache-2.0 license', async () => {
    const config = {
      libName: 'my-lib',
      ts: false,
      authorFullName: 'tg',
      authorEmail: 'tg@g.com',
      pkgManager: null,
      lic: 'Apache-2.0',
      year: 2021,
    };
    await createNodeJsModule(config);
    expect(ConsoleError).not.toHaveBeenCalled();
    expect(existsSync(myLibPath)).toBeTruthy();
    const files = fg.sync(['my-lib/**'], {
      dot: true,
      cwd: tempDir,
    });
    expect(files.length).toBe(8);
    expect(existsSync(path.join(myLibPath, 'src', 'index.js'))).toBeTruthy();
    expect(existsSync(path.join(myLibPath, 'LICENSE'))).toBeTruthy();
  }, 50000);
});
