const replace = require("replace");

replace({
    regex: '/demos/pascal-triangle/stencil/build/app/',
    replacement: '/web-components-benchmark/demos/pascal-triangle/stencil/build/app/',
    paths: ['demos/pascal-triangle/stencil/index.html']
});

replace({
    regex: '/demos/todomvc/stencil/build/app/',
    replacement: '/web-components-benchmark/demos/todomvc/stencil/build/app/',
    paths: ['demos/todomvc/stencil/index.html']
});