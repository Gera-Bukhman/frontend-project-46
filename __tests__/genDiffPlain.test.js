import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff plain JSON nested', () => {
  const result = genDiff(getFixturePath('file1nested.json'), getFixturePath('file2nested.json'), 'plain');
  const expected = readFile('expected_plain.txt');
  expect(result.trim()).toEqual(expected.trim());
});

test('gendiff plain YAML nested', () => {
  const result = genDiff(getFixturePath('file1nested.yaml'), getFixturePath('file2nested.yaml'), 'plain');
  const expected = readFile('expected_plain.txt');
  expect(result.trim()).toEqual(expected.trim());
});
