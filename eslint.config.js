const prettierPlugin = require('eslint-plugin-prettier');
const sortKeysPlugin = require('eslint-plugin-sort-keys');
const typescriptSortKeysPlugin = require('eslint-plugin-typescript-sort-keys');
const reactPlugin = require('eslint-plugin-react');

module.exports = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Линтим файлы с указанными расширениями
    ignores: ['node_modules/', 'build/', 'dist/'], // Игнорируемые директории
    languageOptions: {
      parser: require('@typescript-eslint/parser'), // Подключение TypeScript-парсера
      parserOptions: {
        ecmaVersion: 'latest', // Используем последнюю версию ECMAScript
        sourceType: 'module', // Модули ES
        ecmaFeatures: {
          jsx: true, // Поддержка JSX
        },
      },
    },
    plugins: {
      prettier: prettierPlugin,
      'sort-keys': sortKeysPlugin,
      'typescript-sort-keys': typescriptSortKeysPlugin,
      react: reactPlugin, // Подключение плагина для React
    },
    rules: {
      // Форматирование через Prettier
      'prettier/prettier': 'warn',

      // Сортировка ключей в объектах
      'sort-keys/sort-keys-fix': [
        'warn',
        'asc',
        {
          caseSensitive: true,
          natural: false,
          minKeys: 2,
        },
      ],

      // Сортировка ключей в интерфейсах и типах
      'typescript-sort-keys/interface': [
        'warn',
        'asc',
        {
          requiredFirst: true,
          caseSensitive: true,
          natural: false,
        },
      ],

      // Сортировка пропсов в React-компонентах
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true, // Колбэки идут последними
          shorthandFirst: true, // Шорткаты (e.g., `checked`) идут первыми
          noSortAlphabetically: false, // Алфавитный порядок
          reservedFirst: true, // Зарезервированные пропсы (e.g., `key`) идут первыми
        },
      ],

      // Отключение правила для Next.js
      '@next/next/no-html-link-for-pages': 'off',
    },
  },
];
