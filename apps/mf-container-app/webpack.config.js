const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const { withModuleFederation } = require('@nx/react/module-federation');

const baseConfig = require('./module-federation.config');

const config = {
  ...baseConfig,
};

// Nx plugins for webpack to build config object from Nx options and context.
module.exports = composePlugins(withNx(), withReact(), withModuleFederation(config));

// const { composePlugins, withNx } = require('@nx/webpack');
// const { withReact } = require('@nx/react');
// const { withModuleFederation } = require('@nx/react/module-federation');

// const baseConfig = require('./module-federation.config');

// const config = {
//   ...baseConfig,
//   shared: (libraryName, defaultConfig) => {
//     if (libraryName === '@apollo/client') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/core') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/utilities') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/context') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/http') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/ws') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/error') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/batch-http') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     if (libraryName === '@apollo/client/link/retry') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }

//     if (libraryName === '@apollo/client/link/subscriptions') {
//       return {
//         ...defaultConfig,
//         singleton: true,
//         requiredVersion: '^3.7.11',
//       };
//     }
//     // Returning false means the library is not shared.
//     return false;
//   },
// };

// // Nx plugins for webpack to build config object from Nx options and context.
// module.exports = composePlugins(withNx(), withReact(), withModuleFederation(config));
