const { composePlugins, withNx } = require('@nrwl/webpack');
const { withReact } = require('@nrwl/react');

module.exports = composePlugins(withNx(), withReact(), (config) => {
  const newConfig = {
    ...config,
    devServer: {
      ...config.devServer,
      host: '0.0.0.0',
      port: 6002,
    },
    resolve: {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        buffer: false,
        url: require.resolve('url/'), // Use the url fallback from `mf-project-app`
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
