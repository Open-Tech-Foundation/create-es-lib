const { execFileSync } = require('child_process');

describe('CLI commands', () => {
  it('returns version', () => {
    const stdout = execFileSync('./cli.js', ['-v']);
    expect(stdout.toString().trim()).toMatch(
      /^(v[0-9]+\.[0-9]+\.[0-9]+)(?:(-)[0-9A-Za-z-]+(\.[0-9A-Za-z-]+)*)?$/,
    );
  });

  test('the invalid command fails with an error', () => {
    expect(() => execFileSync('./cli.js', ['-f'])).toThrow();
  });

  test('the empty command should not fail', () => {
    expect(() => execFileSync('./cli.js', [])).not.toThrow();
  });
});
