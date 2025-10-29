import _ from 'lodash';

const isComplex = (value) => _.isObject(value) && value !== null;

const stringifyValue = (value) => {
  if (isComplex(value)) return '[complex value]';
  if (typeof value === 'string') return `'${value}'`;
  return String(value);
};

const plain = (diff, path = '') => {
  const lines = diff.flatMap((item) => {
    const property = path ? `${path}.${item.key}` : item.key;

    switch (item.type) {
      case 'added':
        return `Property '${property}' was added with value: ${stringifyValue(item.value)}`;
      case 'removed':
        return `Property '${property}' was removed`;
      case 'changed':
        return `Property '${property}' was updated. From ${stringifyValue(item.oldValue)} to ${stringifyValue(item.newValue)}`;
      case 'nested':
        return plain(item.children, property);
      case 'unchanged':
        return [];
      default:
        throw new Error(`Unknown type: ${item.type}`);
    }
  });

  return lines.join('\n');
};

export default plain;