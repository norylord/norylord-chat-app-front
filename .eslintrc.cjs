module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'standard-with-typescript',
    'plugin:vue/vue3-essential',
    'plugin:vue/vue3-recommended',
    'plugin:vue/vue3-strongly-recommended',
    'plugin:vue/strongly-recommended'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: ['.eslintrc.{js,cjs}', '*.js', '*.vue', '*.ts'],
      parserOptions: {
        sourceType: 'script'
      }
    }
  ],
  parser: 'vue-eslint-parser',
  parserOptions: {
    ecmaVersion: 'latest',
    parser: '@typescript-eslint/parser',
    sourceType: 'module',
    createDefaultProgram: true,
    project: ['./tsconfig.json', './tsconfig.node.json'],
    extraFileExtensions: ['.vue']
  },
  plugins: ['vue'],
  rules: {
    'vue/order-in-components': [
      'error',
      {
        order: [
          'name',
          'directives',
          'components',
          'mixins',
          ['provide', 'inject'],
          'model',
          'props',
          'filters',
          'data',
          'computed',
          'watch',
          'methods',
          'LIFECYCLE_HOOKS',
          'ROUTER_GUARDS'
        ]
      }
    ],
    'vue/v-for-delimiter-style': ['error', 'of'],
    'vue/next-tick-style': ['error', 'promise'],
    'vue/require-prop-types': 'error',
    'vue/prop-name-casing': ['error', 'camelCase'],
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-definition-name-casing': ['error', 'PascalCase'],
    'vue/no-duplicate-attr-inheritance': 'error',
    'vue/this-in-template': ['error', 'never'],
    'vue/v-on-style': ['error', 'shorthand'],
    'vue/no-multi-spaces': 'error',
    'no-useless-catch': 0,
    'no-useless-escape': 0,
    'no-tabs': 0,
    '@typescript-eslint/restrict-template-expressions': 0,
    'vue/valid-v-slot': 0,
    'vue/custom-event-name-casing': 0,
    'no-unsafe-optional-chaining': 0,
    'vue/multi-word-component-names': 0,
    '@typescript-eslint/no-unused-vars': 0,
    '@typescript-eslint/strict-boolean-expressions': 0,
    '@typescript-eslint/no-empty-interface': 0,
    'no-return-assign': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-floating-promises': 0,
    '@typescript-eslint/no-misused-promises': 0,
    'vue/padding-line-between-blocks': 'error',
    'vue/component-tags-order': [
      'error',
      {
        order: ['template', 'script', 'style']
      }
    ],
    'vue/v-on-event-hyphenation': ['warn', 'always'],
    'vue/no-v-model-argument': 'warn',
    'vue/v-bind-style': 'error',
    'vue/attribute-hyphenation': 'warn',
    'vue/v-slot-style': ['error', 'shorthand'],
    'vue/no-unused-properties': [
      'warn',
      {
        groups: ['props', 'data', 'computed', 'methods', 'setup'],
        ignorePublicMembers: true
      }
    ],
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: {
          max: 1
        },
        multiline: {
          max: 1
        }
      }
    ],
    'vue/first-attribute-linebreak': [
      'error',
      {
        singleline: 'ignore',
        multiline: 'below'
      }
    ]
  }
}
