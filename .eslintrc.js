import { defineConfig } from 'eslint-define-config'

export default defineConfig({
    root: true,
    env: {
        browser: true,
        node: true,
        es6: true
    },
    parser: 'vue-eslint-parser',
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module'
    },
    extends: ['airbnb-base', 'plugin:vue/vue3-essential', 'prettier'],
    rules: {
        'no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_',
                varsIgnorePattern: '^_'
            }
        ],
        quotes: ['error', 'single'],
        'space-before-function-paren': ['error', {
            'anonymous': 'always',
            'named': 'always',
            'asyncArrow': 'always'
        }],
        semi: [1, 'never'],
        'comma-dangle': ['error', 'never'],
        'linebreak-style': 'off',
        'no-return-assign': 'off',
        'no-console': 'off',
        'no-shadow': 'off',
        'no-param-reassign': ['error', { 'props': false }]
    },
    settings: {
        'import/resolver': {
            alias: {
                map: [['@', './src']],
                extensions: ['.js', '.vue', '.jsx', '.json', '.ts']
            }
        }
    }
})
