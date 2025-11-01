import js from '@eslint/js'
import globals from 'globals'

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.jest,
      },
    },
    rules: {
      'semi': ['error', 'never'],
      'arrow-parens': ['error', 'as-needed'],
      'object-curly-newline': ['error', { multiline: true, consistent: true }],
      'operator-linebreak': ['error', 'after'],
      'indent': ['error', 2],
    },
  },
]
