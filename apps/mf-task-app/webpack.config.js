const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  const newConfig = {
    ...config,
    devServer: {
      ...config.devServer,
      port: 6005,
      host: '0.0.0.0',
    },
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        buffer: false,
        url: false,
        assert: false,
        https: false,
        http: false,
        stream: false,
        crypto: false,
        os: false,
        timers: false,
      },
    },
  };

  return newConfig;
});
