const WebpackNotifierPlugin = require('webpack-notifier');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.

module.exports = (config, context) => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,

  // then override your config.
  console.log(config.output.filename);
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
      port: 6002,
    },
    plugins: [
      ...config.plugins,
      new WebpackNotifierPlugin({ title: 'Frontend Project build completed' }),
    ],
  };
};
