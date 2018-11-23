const fs = require('fs-extra');

const {
    benchPageLoad,
    benchCreate,
    benchDelete,
    benchEdit,
    benchTti
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
    },
    {
        name: 'Native',
        slug: 'native',
        version: '',
        github: 'https://github.com/webcomponents/webcomponentsjs',
        stars: '',
        todo: {
            url: 'native-shadow-dom/dist/index.html',
            paths: [
                'todomvc/native-shadow-dom/dist/bundle.js'
            ]
        }
    }
];

(async () => {

    for (let i = 0; i < FW.length; i++) {

        let element = FW[i];

        console.log('********************');
        console.log('* ' + element.name);
        console.log('********************');

        const resultsFileLoad = '../results/todo-load.json';
        let resultsLoad = fs.readJsonSync(resultsFileLoad);
        let averageLoad = await benchPageLoad(element.slug, element.todo.url);
        console.log(`\nAverage time for Page Load : ${Math.ceil(averageLoad)} ms\n`);
        resultsLoad[element.slug] = Math.ceil(averageLoad);
        fs.outputJsonSync(resultsFileLoad, resultsLoad);

        const resultsFileTti = '../results/todo-tti.json';
        let resultsTti = fs.readJsonSync(resultsFileTti);
        let averageTti = await benchTti(element.todo.url);
        console.log(`\nAverage time for time to interactive : ${Math.ceil(averageTti)} ms\n`);
        resultsTti[element.slug] = Math.ceil(averageTti);
        fs.outputJsonSync(resultsFileTti, resultsTti);

        const resultsFileCreate = '../results/todo-create.json';
        let resultsCreate = fs.readJsonSync(resultsFileCreate);
        let averageCreate = await benchCreate(element.slug, element.todo.url);
        console.log(`\nAverage time for creation : ${Math.ceil(averageCreate)} ms\n`);
        resultsCreate[element.slug] = Math.ceil(averageCreate);
        fs.outputJsonSync(resultsFileCreate, resultsCreate);

        const resultsFileDelete = '../results/todo-delete.json';
        let resultsDelete = fs.readJsonSync(resultsFileDelete);
        let averageDelete = await benchDelete(element.slug, element.todo.url);
        console.log(`\nAverage time for delete : ${Math.ceil(averageDelete)} ms\n`);
        resultsDelete[element.slug] = Math.ceil(averageDelete);
        fs.outputJsonSync(resultsFileDelete, resultsDelete);

        const resultsFileEdit = '../results/todo-edit.json';
        let resultsEdit = fs.readJsonSync(resultsFileEdit);
        let averageEdit = await benchEdit(element.slug, element.todo.url);
        console.log(`\nAverage time for edition : ${Math.ceil(averageEdit)} ms\n`);
        resultsEdit[element.slug] = Math.ceil(averageEdit);
        fs.outputJsonSync(resultsFileEdit, resultsEdit);
    }
})();