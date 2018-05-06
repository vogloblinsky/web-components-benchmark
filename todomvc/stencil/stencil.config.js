exports.config = {
    collections: [
        // { name: '@stencil/router' }
    ],
    outputTargets: [
        {
          type: 'www',
          dir: 'www',
          baseUrl: '/stencil/www/'
        }
    ]
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};
