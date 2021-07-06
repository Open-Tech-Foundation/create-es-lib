import ejs from 'ejs';
import IConfig from '../IConfig';

export default function compile(buffer: Buffer, options: IConfig): string {
  return ejs.render(buffer.toString(), options);
}
