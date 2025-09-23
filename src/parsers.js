import { readFileSync } from 'fs';
import path from 'path';
import yaml from 'js-yaml';

const parseFile = (filePath) => {
  const absolutePath = path.resolve(process.cwd(), filePath);
  const content = readFileSync(absolutePath, 'utf-8');
  const ext = path.extname(filePath).toLowerCase();

switch(ext) {
  case '.json':
    return JSON.parse(content);
  case '.yml':
  case '.yaml':
    return yaml.load(content);
  default:
    throw new Error(`Unsupported file extension: ${ext}`)

}

};

export default parseFile;
