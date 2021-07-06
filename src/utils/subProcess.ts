import { spawn } from 'child_process';

export default async function subProcess(
  cmd: string,
  args: string[],
  cwd: string
): Promise<void> {
  const s = spawn(cmd, args, { cwd, shell: true, stdio: 'ignore' });

  return new Promise((resolve, reject) => {
    // if (s.stdout) {
    //   s.stdout.on('data', (chunk) => {
    //     console.log(chunk.toString());
    //   });
    // }
    // if (s.stderr) {
    //   s.stderr.on('data', (chunk) => {
    //     console.log(chunk.toString());
    //   });
    // }
    s.on('close', (code) => {
      if (code && code > 0) {
        reject(code);
      }
      resolve();
    });
  });
}
