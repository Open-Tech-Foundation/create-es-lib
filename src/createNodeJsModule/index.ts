import globby from 'globby';
import Path from 'path';
import { mkdir, readFile, writeFile } from 'fs/promises';
import ejs from 'ejs';
import ora from 'ora';

import IBasicConfig from '../IBasicConfig';

export default async function createNodeJsModule(basicConfig: IBasicConfig) {
  const templatePath = Path.join(__dirname, 'templates', 'nodeJsModule');
  const copySpinner = ora('Creating lib files from templates').start();
  try {
    const filePaths = await globby([templatePath], { dot: true });
    for await (let f of filePaths) {
      const buffer = await readFile(f);
      const txt = ejs.render(buffer.toString(), {
        libName: basicConfig.libName,
      });
      const newFilePath = Path.join(
        process.cwd(),
        basicConfig.libName,
        f.replace(templatePath, ''),
      );
      await mkdir(Path.dirname(newFilePath), { recursive: true });
      await writeFile(newFilePath, txt);
    }
    copySpinner.succeed('Library files created from templates');
  } catch (error) {
    copySpinner.fail(error.message);
    process.exit(1);
  }
}
