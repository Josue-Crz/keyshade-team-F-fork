module.exports = {
  extends: ['custom/next'],
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module'
  },
  rules: {
    '@typescript-eslint/explicit-function-return-type': 'off',
    'turbo/no-undeclared-env-vars': 'off',
    'eslint-comments/no-unused-disable': 'off',
    '@typescript-eslint/dot-notation': ['error', { allowKeywords: true, allowPattern: '^[a-z]+(_[a-z]+)+$' }],
    '@typescript-eslint/no-empty-function': ['error', { allow: ['arrowFunctions', 'functions', 'methods'] }],
    'no-html-link-for-pages': 'off'
  },
  overrides: [
    {
      files: ['src/lib/controller-instance.ts'],
      rules: {
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/dot-notation': 'off',
        '@typescript-eslint/no-empty-function': 'off'
      }
    }
  ]
}
