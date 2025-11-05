import { readFileSync } from 'fs'
import path from 'path'
import parse from './parsers.js'
import format from './formatters/index.js'
import buildDiff from './buildDiff.js'

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const file1 = readFileSync(path.resolve(filepath1), 'utf8')
  const file2 = readFileSync(path.resolve(filepath2), 'utf8')

  const ext1 = path.extname(filepath1).slice(1)
  const ext2 = path.extname(filepath2).slice(1)

  const obj1 = parse(file1, ext1)
  const obj2 = parse(file2, ext2)

  const diff = buildDiff(obj1, obj2)

  return format(diff, formatName)
}

export default genDiff
