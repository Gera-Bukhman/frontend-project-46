import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalize = (s) => s.split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .join('\n');

test('gendiff JSON nested', () => {
  const result = genDiff(getFixturePath('file1nested.json'), getFixturePath('file2nested.json'));
  const expected = readFile('expected_nested.txt');
  expect(normalize(result)).toEqual(normalize(expected));
});

test('gendiff YAML nested', () => {
  const result = genDiff(getFixturePath('file1nested.yaml'), getFixturePath('file2nested.yaml'));
  const expected = readFile('expected_nested.txt');
  expect(normalize(result)).toEqual(normalize(expected));
});

