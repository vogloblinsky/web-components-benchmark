const replace = require('replace');

replace({
    regex: '/build',
    replacement: './build',
    paths: ['demos/pascal-triangle/stencil/index.html']
});

replace({
    regex: '/demos/todomvc/stencil/build/app/',
    replacement: '/web-components-benchmark/demos/todomvc/stencil/build/app/',
    paths: ['demos/todomvc/stencil/index.html']
});
