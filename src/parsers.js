import { readFileSync } from 'fs';
import path from 'path';

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = readFileSync(absolutePath, 'utf-8');
  return JSON.parse(content);
};

export default parseFile;
