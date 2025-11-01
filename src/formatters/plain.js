const stringify = value => {
  if (value === null) {
    return 'null'
  }

  if (typeof value === 'object') {
    return '[complex value]'
  }

  if (typeof value === 'string') {
    return `'${value}'`
  }

  return String(value)
}

const formatPlain = (diff, path = '') => {
  const lines = diff.flatMap(node => {
    const { key, type, value, children, oldValue, newValue } = node
    const currentPath = path ? `${path}.${key}` : key

    switch (type) {
    case 'added':
      return `Property '${currentPath}' was added with value: ${stringify(value)}`
    case 'removed':
      return `Property '${currentPath}' was removed`
    case 'updated':
      return `Property '${currentPath}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`
    case 'nested':
      return formatPlain(children, currentPath)
    case 'unchanged':
      return []
    default:
      throw new Error(`Unknown type: ${type}`)
    }
  })

  return lines.join('\n')
}

export default formatPlain
