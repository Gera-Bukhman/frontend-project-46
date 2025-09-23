import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import genDiff from '../src/index.js';

// Функция для получения пути к фикстурам
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Функция для пути к фикстурам
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

// Чтение файла
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const normalize = (s) => s.split('\n')
  .map((line) => line.trim())
  .filter((line) => line.length > 0)
  .join('\n');

test('genDiff flat JSON files', () => {
  const filepath1 = getFixturePath('file1.json');
  const filepath2 = getFixturePath('file2.json');
  const expected = readFile('expected.txt');

  const result = genDiff(filepath1, filepath2);
  expect(normalize(result)).toEqual(normalize(expected));
});

test('genDiff flat YAML files', () => {
  const filepath1 = getFixturePath('file1.yaml');
  const filepath2 = getFixturePath('file2.yaml');
  const expected = readFile('expected.txt');
  const result = genDiff(filepath1, filepath2);
  expect(normalize(result)).toEqual(normalize(expected));
});