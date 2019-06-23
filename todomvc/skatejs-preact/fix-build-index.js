const replace = require('replace');
replace({
    regex: 'src.e31bb0bc.js',
    replacement: 'main.js',
    paths: ['dist/index.html']
});
