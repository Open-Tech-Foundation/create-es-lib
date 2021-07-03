import Path from 'path';
import prettier from 'prettier';

export default function prettify(data: string, filePath: string): string {
  const extns = ['.js', '.ts', '.json', '.md', '.css', '.html', '.yml'];
  if (extns.includes(Path.extname(filePath))) {
    return prettier.format(data, { filepath: filePath, singleQuote: true });
  }
  return data;
}
