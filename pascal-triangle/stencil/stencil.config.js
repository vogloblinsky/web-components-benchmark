exports.config = {
  bundles: [
    { components: ['pascal-triangle', 'triangle-item'] }
  ],
  outputTargets:[
    { 
      type: 'www',
      dir: 'www',
      baseUrl: '/stencil/www/',
      serviceWorker: false
    }
  ]
};

exports.devServer = {
  root: 'www',
  watchGlob: '**/**'
}
