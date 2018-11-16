const fs = require('fs-extra');

const {
    benchPageLoad,
    benchCreate,
    benchDelete,
    benchEdit
} = require('./helpers');

const FW = [{
    name: 'Angular Elements',
    slug: 'angular-elements',
    github: 'https://github.com/angular/angular',
    version: require('../angular-elements/package.json').dependencies['@angular/core'],
    stars: 42492,
    todo: {
        url: 'angular-elements/dist/index.html',
        paths: [
            'todomvc/angular-elements/dist/main.bundle.js'
        ]
    }
}];

(async () => {
    const resultsFileLoad = '../results/todo-load.json';
    let resultsLoad = {};
    let averageLoad = await benchPageLoad(FW[0].slug, FW[0].todo.url);
    console.log(`\nAverage time for Page Load ${FW[0].name} : ${Math.ceil(averageLoad)} ms\n`);
    resultsLoad[FW[0].slug] = Math.ceil(averageLoad);
    fs.outputJsonSync(resultsFileLoad, resultsLoad);

    const resultsFileCreate = '../results/todo-create.json';
    let resultsCreate = {};
    let averageCreate = await benchCreate(FW[0].slug, FW[0].todo.url);
    console.log(`\nAverage time for creation ${FW[0].name} : ${Math.ceil(averageCreate)} ms\n`);
    resultsCreate[FW[0].slug] = Math.ceil(averageCreate);
    fs.outputJsonSync(resultsFileCreate, resultsCreate);

    const resultsFileDelete = '../results/todo-delete.json';
    let resultsDelete = {};
    let averageDelete = await benchDelete(FW[0].slug, FW[0].todo.url);
    console.log(`\nAverage time for delete ${FW[0].name} : ${Math.ceil(averageDelete)} ms\n`);
    resultsDelete[FW[0].slug] = Math.ceil(averageDelete);
    fs.outputJsonSync(resultsFileDelete, resultsDelete);

    const resultsFileEdit = '../results/todo-delete.json';
    let resultsEdit = {};
    let averageEdit = await benchEdit(FW[0].slug, FW[0].todo.url);
    console.log(`\nAverage time for edition ${FW[0].name} : ${Math.ceil(averageEdit)} ms\n`);
    resultsEdit[FW[0].slug] = Math.ceil(averageEdit);
    fs.outputJsonSync(resultsFileEdit, resultsEdit);
})();