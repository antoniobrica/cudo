const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`

  const newConfig = {
    ...config,
    devServer: {
      ...config.devServer,
      port: 6001,
      host: '0.0.0.0',
    },
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        url: require.resolve('url/'),
      },
    },
  };
  return newConfig;
});
