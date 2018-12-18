exports.config = {
  collections: [
    // { name: '@stencil/router' }
  ],
  outputTargets: [{
    type: 'www',
    dir: 'dist',
    baseUrl: '/demos/todomvc/stencil/',
    serviceWorker: false
  }]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
};
