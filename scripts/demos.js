const metas = require('../common/meta');
const fs = require('fs-extra');

const pascalLoadResults = require('../results/pascal-triangle-load.json');

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

    fs.ensureDirSync(finalPascalDemoPath);

    if (pascalLoadResults[lib.slug] && fs.existsSync(originalPascalDemoPath)) {
        fs.copySync(originalPascalDemoPath, finalPascalDemoPath)
    }
}

metas.wc.forEach(onElement);

metas.fw.forEach(onElement);