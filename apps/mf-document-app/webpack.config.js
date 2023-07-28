const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');
const WebpackNotifierPlugin = require('webpack-notifier');

const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  // then override your config.
  config.optimization.runtimeChunk = false;
  config.optimization.splitChunks = {
    cacheGroups: {
      default: false,
    },
  };
  // return {
  //   ...config,
  //   devServer: {
  //     ...config.devServer,
  //     port: 6010,
  //   },
  //   plugins: [
  //     ...config.plugins,
  //     new WebpackNotifierPlugin({ title: 'Frontend Project build completed' }),
  //     new BundleAnalyzerPlugin(),
  //   ],
  //   output: {
  //     ...config.output,
  //     library: 'mfProducts',
  //     libraryTarget: 'window',
  //   },
  //   optimization: {
  //     minimize: false,
  //   },
  // };

  // return config;
  const newConfig = {
    ...config,
    devServer: {
      ...config.devServer,
      port: 6010,
      host: '0.0.0.0',
    },

    output: {
      ...config.output,
      library: 'mfProducts',
      libraryTarget: 'window',
    },
    optimization: {
      minimize: false,
    },
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        // buffer: false,
        // url: false,
        // assert: false,
        // https: false,
        // http: false,
        // stream: false,
        // crypto: false,
        // os: false,
        // timers: false,
        buffer: require.resolve('buffer/'),
        url: require.resolve('url/'),
        assert: require.resolve('assert/'),
        https: require.resolve('https-browserify'),
        http: require.resolve('stream-http'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify'),
        os: require.resolve('os-browserify/browser'),
        timers: require.resolve('timers-browserify'),
      },
    },
  };
  return newConfig;
});
