module.exports = {
  extends: [
    'stylelint-config-standard-scss', // Подключаем стандартную конфигурацию для SCSS
    'stylelint-config-prettier', // Для совместимости с Prettier
  ],
  plugins: [
    'stylelint-order', // Плагин для сортировки
    '@stylistic/stylelint-plugin', // Плагин для стилистических правил
  ],
  rules: {
    // Сортировка свойств в алфавитном порядке
    'order/properties-alphabetical-order': true,

    // Пример дополнительных правил
    '@stylistic/color-hex-case': 'lower',
    '@stylistic/selector-class-pattern': '^[a-z][a-zA-Z0-9_-]+$', // Классы в стиле my-class
    '@stylistic/block-opening-brace-space-before': 'always', // Пробел перед {
  },
  ignoreFiles: ['node_modules/**', 'dist/**', 'build/**'], // Игнорируем ненужные файлы
};
