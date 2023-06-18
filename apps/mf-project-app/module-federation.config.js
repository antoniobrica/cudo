module.exports = {
  name: 'mf-project-app',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    if (libraryName === '@ory/client') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
  },
};
