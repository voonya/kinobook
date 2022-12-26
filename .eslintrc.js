module.exports = {
  root: true,
  env: {
    node: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    tsconfigRootDir: __dirname,
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'import', 'unused-imports'],
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended'],
  rules: {
    'import/newline-after-import': ['error', { count: 1 }],

    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
      },
    ],
    'padded-blocks': ['error', 'never'],
    'lines-between-class-members': ['error', 'always'],
    'newline-before-return': 'error',
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 4 }],
    'arrow-body-style': ['error', 'as-needed'],
    'prefer-arrow-callback': 'error',
    'no-unused-vars': 'off',
    semi: ['error', 'always'],

    '@typescript-eslint/consistent-type-imports': 'error',
    '@typescript-eslint/no-unused-vars': "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  },
};
