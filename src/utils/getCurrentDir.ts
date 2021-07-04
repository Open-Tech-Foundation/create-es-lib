import { fileURLToPath } from 'url';
import { dirname } from 'path';

export default function getCurrentDir(): string {
  const __filename = fileURLToPath(import.meta.url);
  return dirname(__filename);
}
