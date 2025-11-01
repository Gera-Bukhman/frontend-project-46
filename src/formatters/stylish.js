const stringify = (value, depth = 1) => {
  if (typeof value !== 'object' || value === null) {
    return String(value)
  }

  const indent = ' '.repeat(depth * 4)
  const bracketIndent = ' '.repeat((depth - 1) * 4)
  const entries = Object.entries(value)

  const lines = entries.map(([key, val]) => {
    const formattedValue = stringify(val, depth + 1)
    return `${indent}${key}: ${formattedValue}`
  })

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

const stylish = (diff, depth = 1) => {
  const indent = ' '.repeat(depth * 4 - 2)
  const bracketIndent = ' '.repeat((depth - 1) * 4)

  const lines = diff.flatMap(node => {
    const { key, type, value, children, oldValue, newValue } = node

    switch (type) {
    case 'added':
      return `${indent}+ ${key}: ${stringify(value, depth + 1)}`
    case 'removed':
      return `${indent}- ${key}: ${stringify(value, depth + 1)}`
    case 'unchanged':
      return `${indent}  ${key}: ${stringify(value, depth + 1)}`
    case 'updated':
      return [
        `${indent}- ${key}: ${stringify(oldValue, depth + 1)}`,
        `${indent}+ ${key}: ${stringify(newValue, depth + 1)}`,
      ]
    case 'nested':
      return `${indent}  ${key}: ${stylish(children, depth + 1)}`
    default:
      throw new Error(`Unknown type: ${type}`)
    }
  })

  return ['{', ...lines, `${bracketIndent}}`].join('\n')
}

export default stylish
