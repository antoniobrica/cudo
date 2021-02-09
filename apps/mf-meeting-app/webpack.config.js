const WebpackNotifierPlugin = require('webpack-notifier');
const nrwlConfig = require('@nrwl/react/plugins/webpack.js'); // require the main @nrwl/react/plugins/webpack configuration function.
const path = require('path');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;

module.exports = (config, context) => {
  nrwlConfig(config); // first call it so that it @nrwl/react plugin adds its configs,

  // then override your config.
  console.log(JSON.stringify(config.output.path));
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
    plugins: [
      ...config.plugins,
      new WebpackNotifierPlugin({ title: 'Frontend Project build completed' }),
      new BundleAnalyzerPlugin(),
    ],
  };
};
