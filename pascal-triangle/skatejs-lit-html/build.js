const Bundler = require('parcel-bundler');
const Path = require('path');

const entryFiles = Path.join(__dirname, './src/index.html');

const options = {
    outDir: './dist',
    outFile: 'index.html',
    publicUrl: './',
    cache: false,
    contentHash: false,
    minify: true,
    scopeHoist: false,
    sourceMaps: false,
    detailedReport: true
};

const bundler = new Bundler(entryFiles, options);
bundler.on('buildEnd', () => {
    console.log('buildEnd');
    process.exit(0);
});
bundler.on('buildError', error => {
    console.log('buildError');
    process.exit(1);
});
bundler.bundle();
