module.exports = {
  stories: ['../src/components/**/*.stories.(ts|tsx|js|jsx)'],
  addons: [
    '@storybook/preset-typescript',
    '@storybook/addon-actions',
    '@storybook/addon-knobs',
    '@storybook/addon-notes',
  ],
};
