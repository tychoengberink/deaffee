module.exports = {
  root: true,
  env: {
    node: true
  },
  plugins : ['jest'],
  'extends': [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    "plugin:jest/recommended"
  ],
  parserOptions: {
    ecmaVersion: 2020
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'vue/no-deprecated-slot-attribute': 'off',
    "jest/no-disabled-tests": "warn",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/prefer-to-have-length": "warn",
    "jest/valid-expect": "error",
    'jest/expect-expect': [
      'warn',
      {
        assertFunctionNames: ['expect', '*.assert', '*.contains'],
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)'
      ],
      "env": {
        "jest/globals": true
      }
    }
  ]
}
