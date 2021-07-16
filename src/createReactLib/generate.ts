import copyTemplates from '../common/copyTemplates';
import IConfig from '../IConfig';

export default async function generate(
  templatePath: string,
  destPath: string,
  config: IConfig
): Promise<void> {
  await copyTemplates(templatePath, destPath, config, [
    '!**/src/MyComponent.ejs',
  ]);
}
