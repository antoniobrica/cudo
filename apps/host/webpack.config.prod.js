const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { withModuleFederation } = require('@nx/react/module-federation');

const baseConfig = require('./module-federation.config');

const prodConfig = {
  ...baseConfig,
  /*
   * Remote overrides for production.
   * Each entry is a pair of a unique name and the URL where it is deployed.
   *
   * e.g.
   * remotes: [
   *   ['app1', 'http://app1.example.com'],
   *   ['app2', 'http://app2.example.com'],
   * ]
   *
   * You can also use a full path to the remoteEntry.js file if desired.
   *
   * remotes: [
   *   ['app1', 'http://example.com/path/to/app1/remoteEntry.js'],
   *   ['app2', 'http://example.com/path/to/app2/remoteEntry.js'],
   * ]
   */
  remotes: [
    ['mf-container-app', 'http://localhost:3000/mf-container-app'],
    ['mf-project-app', 'http://localhost:3000/mf-project-app'],
    ['mf-task-app', 'http://localhost:3000/mf-task-app'],
  ],
  // remotes: [
  //   ['shop', 'http://localhost:3000/shop'],
  //   ['cart', 'http://localhost:3000/cart'],
  //   ['about', 'http://localhost:3000/about'],
  // ],
};

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(withNx(), withReact(), withModuleFederation(prodConfig));
