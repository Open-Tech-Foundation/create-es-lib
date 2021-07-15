import { spawn, ChildProcess } from 'child_process';

export default async function subProcess(
  cmd: string,
  args: string[],
  cwd: string,
  debug = false
): Promise<void> {
  let sp: ChildProcess;

  if (process.platform === 'win32') {
    sp = spawn(cmd, args, {
      cwd,
      shell: 'cmd.exe',
      stdio: debug ? 'inherit' : 'ignore',
    });
  } else {
    sp = spawn(cmd, args, {
      cwd,
      shell: true,
      stdio: debug ? 'inherit' : 'ignore',
    });
  }

  return new Promise((resolve, reject) => {
    if (debug) {
      if (sp.stdout) {
        sp.stdout.on('data', (chunk) => {
          console.log(chunk.toString());
        });
      }
      if (sp.stderr) {
        sp.stderr.on('data', (chunk) => {
          console.log(chunk.toString());
        });
      }
    }
    sp.on('close', (code) => {
      if (code && code > 0) {
        reject(code);
      }
      resolve();
    });
  });
}
