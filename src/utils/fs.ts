import fs from 'fs';
import { promisify } from 'util';

const readFile = promisify(fs.readFile);
const mkdir = promisify(fs.mkdir);
const writeFile = promisify(fs.writeFile);

export { readFile, mkdir, writeFile };
