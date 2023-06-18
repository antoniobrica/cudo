module.exports = {
  name: 'mf-container-app',
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

    if (libraryName === 'react-quill') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
  },
};
