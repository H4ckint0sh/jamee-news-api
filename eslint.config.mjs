import eslintPluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';
import nodePlugin from 'eslint-plugin-n';

export default [
    {
        files: ['**/*.js', '**/*.cjs'],
        languageOptions: {
            ecmaVersion: 2022,
            sourceType: 'module',
            globals: {
                require: 'readonly',
                module: 'readonly',
                __dirname: 'readonly',
                process: 'readonly',
            },
        },
        plugins: {
            n: nodePlugin,
            prettier: eslintPluginPrettier,
        },
        rules: {
            ...nodePlugin.configs['recommended'].rules,
            'prettier/prettier': 'error',
        },
    },
    {
        rules: {
            ...prettierConfig.rules,
        },
    },
];
