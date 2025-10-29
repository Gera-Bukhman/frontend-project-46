import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff JSON format', () => {
  const result = genDiff(getFixturePath('file1nested.json'), getFixturePath('file2nested.json'), 'json');
  const expected = readFile('expected_json.txt'); // файл с JSON выводом
  expect(result.trim()).toEqual(expected.trim());
});
