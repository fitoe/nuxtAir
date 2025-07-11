import antfu from '@antfu/eslint-config'
import nuxt from './.nuxt/eslint.config.mjs'

export default antfu(
  {
    unocss: false,
    formatters: true,
    pnpm: true,
  },
  {
    files: ['**/*.vue'],
    rules: {
      'no-empty-character-class': 'error',
      'vue/html-closing-bracket-newline': ['error', {
        singleline: 'never',
        multiline: 'never',
      }],
      'vue/html-closing-bracket-spacing': ['error', {
        startTag: 'never',
        endTag: 'never',
        selfClosingTag: 'never',
      }],
      'vue/html-end-tags': 'error',
      'vue/max-attributes-per-line': ['error', {
        singleline: { max: 99 }, // 允许单行有多个属性
        multiline: { max: 1 },
      }],
      'vue/multiline-html-element-content-newline': ['error', {
        ignoreWhenEmpty: true,
        ignores: ['pre', 'textarea'],
        allowEmptyLines: false,
      }],
      'vue/html-self-closing': ['error', {
        html: {
          void: 'always',
          normal: 'never',
          component: 'always',
        },
        svg: 'always',
        math: 'always',
      }],
      'vue/html-quotes': ['error', 'double'],
      'vue/no-multi-spaces': ['error', {
        ignoreProperties: false,
      }],
      'vue/attribute-hyphenation': ['error', 'always', {
        ignore: [],
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase', {
        registeredComponentsOnly: true,
        ignores: [],
      }],
      'vue/html-button-has-type': 'error',
      'vue/no-irregular-whitespace': 'error',
      'vue/no-spaces-around-equal-signs-in-attribute': 'error',
      'vue/html-comment-content-spacing': ['error', 'always'],
      'vue/max-len': ['error', {
        code: 120,
        template: 120,
        tabWidth: 2,
        ignoreUrls: true,
        ignoreComments: false,
        ignoreRegExpLiterals: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
      }],
      'vue/no-useless-template-attributes': 'error',
      'vue/no-useless-v-bind': 'error',
      // 新增防止HTML标签换行的规则
      'vue/singleline-html-element-content-newline': 'off',

      'vue/html-indent': ['error', 2, {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: [],
      }],
      'vue/require-default-prop': 'error',
      'vue/require-prop-types': 'error',
      'vue/array-bracket-newline': ['error', 'consistent'],
      'vue/object-curly-newline': ['error', {
        consistent: true,
        multiline: true,
      }],
    },
  },
).append(nuxt())
