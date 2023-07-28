const WebpackNotifierPlugin = require('webpack-notifier');
const nrwlConfig = require('@nx/react/plugins/webpack.js'); // require the main @nx/react/plugins/webpack configuration function.

module.exports = (config, context) => {
  nrwlConfig(config); // first call it so that it @nx/react plugin adds its configs,

  // then override your config.
  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  return {
    ...config,
    devServer: {
      ...config.devServer,
      port: 6005,
    },
    plugins: [...config.plugins, new WebpackNotifierPlugin({ title: 'Frontend Project build completed' })],
  };
};
