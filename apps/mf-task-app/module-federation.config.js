module.exports = {
  name: 'mf-task-app',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    console.log(libraryName);
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

    if (libraryName === 'redux') {
      return {
        ...defaultConfig,
        strictVersion: false,
      };
    }
  },
};
