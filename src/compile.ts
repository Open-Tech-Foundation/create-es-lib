import ejs from 'ejs';

export default function compile(
  buffer: Buffer,
  options: Record<string, unknown>,
) {
  return ejs.render(buffer.toString(), options);
}
