exports.config = {
    collections: [
        // { name: '@stencil/router' }
    ],
    outputTargets: [
        {
          type: 'www',
          dir: 'www-prerendered',
          baseUrl: '/stencil/www-prerendered/',
          serviceWorker: false
        }
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};
