const metas = require('../common/meta');
const fs = require('fs-extra');

const pascalLoadResults = require('../results/pascal-triangle-load.json');

metas.wc.forEach(lib => {
    console.log(lib.slug);
    fs.ensureDirSync(`demos/todomvc/${lib.slug}`);

    fs.ensureDirSync(`demos/pascal-triangle/${lib.slug}`);

    // if (pascalLoadResults[lib.slug]) {
});