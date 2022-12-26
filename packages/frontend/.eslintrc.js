module.exports = {
  env: {
    browser: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    '../../.eslintrc.js',
    'prettier'
  ],
  plugins: ['react', 'react-hooks', 'prettier', 'unused-imports'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-useless-escape': 'off',
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": [
      "warn",
      { "vars": "all", "varsIgnorePattern": "^_", "args": "after-used", "argsIgnorePattern": "^_" }
    ]
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
