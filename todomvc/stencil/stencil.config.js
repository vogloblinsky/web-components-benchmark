exports.config = {
    collections: [
        // { name: '@stencil/router' }
    ],
    publicPath: '/stencil/www/build/app/',
    serviceWorker: {
        // swDest: 'stencil/',
    },
    wwwDir: 'www'
};

exports.devServer = {
    root: 'www',
    watchGlob: '**/**'
};
