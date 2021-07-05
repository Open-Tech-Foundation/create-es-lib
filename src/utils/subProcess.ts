import { spawn } from 'child_process';

export default async function subProcess(
  cmd: string,
  args: string[],
  cwd: string
): Promise<void> {
  const s = spawn(cmd, args, { cwd, shell: true, stdio: 'ignore' });

  return new Promise((resolve, reject) => {
    // s.stdout.on('data', (chunk) => {
    //   console.log(chunk.toString());
    // });
    s.on('close', (code) => {
      if (code === 1) {
        reject(code);
      }
      resolve();
    });
  });
}
