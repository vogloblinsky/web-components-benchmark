exports.config = {
    collections: [
        // { name: '@stencil/router' }
    ],
    publicPath: '/stencil/www-prerendered/build/app/',
    serviceWorker: {
        // swDest: 'stencil/',
    },
    wwwDir: 'www-prerendered'
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};
