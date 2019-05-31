exports.config = {
  collections: [
    // { name: '@stencil/router' }
  ],
  outputTargets: [
    {
      type: 'www',
      dir: 'dist',
      baseUrl: '/demos/pascal-triangle/stencil/',
      serviceWorker: false
    }
  ],
  hashFileNames: false
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
