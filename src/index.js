import { readFileSync } from 'fs'
import path from 'path'
import parse from './parsers.js'
import format from './formatters/index.js'

const buildDiff = (obj1, obj2) => {
  const keys = [...new Set([...Object.keys(obj1), ...Object.keys(obj2)])].sort()

  return keys.map((key) => {
    const value1 = obj1[key]
    const value2 = obj2[key]

    if (!Object.hasOwn(obj2, key)) {
      return { key, type: 'removed', value: value1 }
    }

    if (!Object.hasOwn(obj1, key)) {
      return { key, type: 'added', value: value2 }
    }

    if (typeof value1 === 'object' && value1 !== null && 
        typeof value2 === 'object' && value2 !== null &&
        !Array.isArray(value1) && !Array.isArray(value2)) {
      return {
        key,
        type: 'nested',
        children: buildDiff(value1, value2),
      }
    }

    if (value1 !== value2) {
      return {
        key,
        type: 'updated',
        oldValue: value1,
        newValue: value2,
      }
    }

    return { key, type: 'unchanged', value: value1 }
  })
}

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
