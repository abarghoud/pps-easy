const baseConfig = require('../../../eslint.config.js');

module.exports = [
  ...baseConfig,
  {
    files: ['**/*.json'],
    rules: {},
    languageOptions: {
      parser: require('jsonc-eslint-parser'),
    },
  },
];
