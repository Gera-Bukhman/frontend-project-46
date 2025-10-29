import _ from 'lodash';

const getIndent = (depth, type = 'space') => {
  const base = ' '.repeat(depth * 4 - 2);
  if (type === 'plus') return `${base}+ `;
  if (type === 'minus') return `${base}- `;
  return `${base}  `;
};

const stringify = (value, depth) => {
  if (!_.isObject(value) || value === null) return String(value);

  const entries = Object.entries(value);
  const lines = entries.map(
    ([key, val]) => `${getIndent(depth + 1)}${key}: ${stringify(val, depth + 1)}`
  );

  return `{\n${lines.join('\n')}\n${' '.repeat(depth * 4 - 2)}}`;
};

const stylish = (diff, depth = 1) => {
  const lines = diff.flatMap((item) => {
    switch (item.type) {
      case 'added':
        return `${getIndent(depth, 'plus')}${item.key}: ${stringify(item.value, depth)}`;
      case 'removed':
        return `${getIndent(depth, 'minus')}${item.key}: ${stringify(item.value, depth)}`;
      case 'unchanged':
        return `${getIndent(depth)}${item.key}: ${stringify(item.value, depth)}`;
      case 'changed':
        return [
          `${getIndent(depth, 'minus')}${item.key}: ${stringify(item.oldValue, depth)}`,
          `${getIndent(depth, 'plus')}${item.key}: ${stringify(item.newValue, depth)}`
        ];
      case 'nested':
        return `${getIndent(depth)}${item.key}: ${stylish(item.children, depth + 1)}`;
      default:
        throw new Error(`Unknown type: ${item.type}`);
    }
  });

  return `{\n${lines.join('\n')}\n${' '.repeat((depth - 1) * 4)}}`;
};

export default stylish;
