exports.config = {
  collections: [
    // { name: '@stencil/router' }
  ],
  outputTargets: [
    {
      type: 'www',
      dir: 'dist',
      serviceWorker: false
    }
  ],
  hashFileNames: false
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
