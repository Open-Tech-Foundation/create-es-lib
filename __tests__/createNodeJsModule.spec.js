import process from 'process';
import Os from 'os';
import { jest } from '@jest/globals';

import { createNodeJsModule } from '../lib/createESLib.js';
import { rmdirSync } from 'fs';
import path from 'path';

const tempDir = Os.tmpdir();
let ConsoleError;

jest.setTimeout(50000);

beforeAll(() => {
  rmdirSync(path.join(tempDir, 'my-lib'), { recursive: true });
});

beforeEach(() => {
  const cwdSpy = jest.spyOn(process, 'cwd');
  cwdSpy.mockReturnValue(tempDir);
  ConsoleError = jest.spyOn(console, 'error');
});

afterEach(() => {
  rmdirSync(path.join(tempDir, 'my-lib'), { recursive: true });
});

describe('createNodeJsModule', () => {
  it('creates a my-lib', async () => {
    const config = {
      libName: 'my-lib',
      ts: false,
      authorFullName: 'tg',
      authorEmail: 'a@a',
      pkgManager: 'npm',
    };
    await createNodeJsModule(config);
    expect(ConsoleError).not.toHaveBeenCalled();
  });
});
