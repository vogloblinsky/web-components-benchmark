const metas = require('../common/meta');
const fs = require('fs-extra');
const replace = require("replace");

const onElement = (lib) => {
    console.log(lib.slug);
    const finalTodoDemoPath = `demos/todomvc/${lib.slug}`;
    fs.ensureDirSync(finalTodoDemoPath);

    const originalTodoDemoPath = `todomvc/${lib.slug}/dist`;

    if (fs.existsSync(originalTodoDemoPath)) {
        fs.copySync(originalTodoDemoPath, finalTodoDemoPath)
    }

    const originalPascalDemoPath = `pascal-triangle/${lib.slug}/dist`;
    const finalPascalDemoPath = `demos/pascal-triangle/${lib.slug}`;

    if (fs.existsSync(originalPascalDemoPath)) {
        fs.ensureDirSync(finalPascalDemoPath);
        fs.copySync(originalPascalDemoPath, finalPascalDemoPath)
    }
}

metas.wc.forEach(onElement);

metas.fw.forEach(onElement);

fs.copySync('pascal-triangle/index.html', 'demos/pascal-triangle/index.html');
fs.copySync('todomvc/index.html', 'demos/todomvc/index.html');

replace({
    regex: '/dist',
    replacement: '/',
    paths: ['demos/todomvc/index.html', 'demos/pascal-triangle/index.html']
})