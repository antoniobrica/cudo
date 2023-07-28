module.exports = {
  name: 'mf-container-app',
  exposes: {
    './Module': './src/remote-entry.ts',
  },
  shared: (libraryName, defaultConfig) => {
    console.log(libraryName);
    if (libraryName === '@ory/client') {
      console.log(defaultConfig);
      return {
        ...defaultConfig,
        strictVersion: false,
        // requiredVersion: '1.1.69',
      };
    }

    //   // if (libraryName.includes('@cudo') || libraryName === '{}') {
    //   //   return false;
    //   // }
    //   // // Returning false means the library is not shared.
    //   // else return true;
  },
};
