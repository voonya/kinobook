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
  plugins: ['react', 'react-hooks', 'prettier'],
  rules: {
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/display-name': 'off',
    '@typescript-eslint/ban-types': 'off',
    'no-useless-escape': 'off',
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
};
