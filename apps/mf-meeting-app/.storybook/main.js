const rootMain = require('../../../.storybook/main');

// Use the following syntax to add addons!
// rootMain.addons.push('');
rootMain.stories.push(
  ...['../src/app/**/*.stories.mdx', '../src/app/**/*.stories.@(js|jsx|ts|tsx)']
);
rootMain.core = { ...rootMain.core, builder: 'webpack5' };

module.exports = rootMain;
