const fs = require('fs-extra');

const meta = require('../../results/meta');

const {
    benchPageLoad,
    benchCreate,
    benchDelete,
    benchEdit,
    benchTti
} = require('./helpers');

let ELEMENTS = [...meta.wc, ...meta.fw];

let requestedElements = process.env.ELEMENTS;

if (requestedElements) {
    requestedElements = requestedElements.split(',');
    ELEMENTS = requestedElements.map((requestedElement) => {
        let element = meta.wc.find((wcElement) => wcElement.slug === requestedElement);
        if (!element) {
            element = meta.fw.find((wcElement) => wcElement.slug === requestedElement);
        }
        return element;
    })
}

(async () => {

    for (let i = 0; i < ELEMENTS.length; i++) {

        let element = ELEMENTS[i];

        console.log('********************');
        console.log('* ' + element.name);
        console.log('********************');

        const resultsFileLoad = '../results/todo-load.json';
        fs.ensureFileSync(resultsFileLoad);
        let resultsLoad = fs.readJsonSync(resultsFileLoad);
        let averageLoad = await benchPageLoad(element, element.todo.url);
        console.log(`\nAverage time for Page Load : ${Math.ceil(averageLoad)} ms\n`);
        resultsLoad[element.slug] = Math.ceil(averageLoad);
        fs.outputJsonSync(resultsFileLoad, resultsLoad);

        const resultsFileTti = '../results/todo-tti.json';
        fs.ensureFileSync(resultsFileTti);
        let resultsTti = fs.readJsonSync(resultsFileTti);
        let averageTti = await benchTti(element.todo.url);
        console.log(`\nAverage time for time to interactive : ${Math.ceil(averageTti)} ms\n`);
        resultsTti[element.slug] = Math.ceil(averageTti);
        fs.outputJsonSync(resultsFileTti, resultsTti);

        const resultsFileCreate = '../results/todo-create.json';
        fs.ensureFileSync(resultsFileCreate);
        let resultsCreate = fs.readJsonSync(resultsFileCreate);
        let averageCreate = await benchCreate(element, element.todo.url);
        console.log(`\nAverage time for creation : ${Math.ceil(averageCreate)} ms\n`);
        resultsCreate[element.slug] = Math.ceil(averageCreate);
        fs.outputJsonSync(resultsFileCreate, resultsCreate);

        const resultsFileDelete = '../results/todo-delete.json';
        fs.ensureFileSync(resultsFileDelete);
        let resultsDelete = fs.readJsonSync(resultsFileDelete);
        let averageDelete = await benchDelete(element, element.todo.url);
        console.log(`\nAverage time for delete : ${Math.ceil(averageDelete)} ms\n`);
        resultsDelete[element.slug] = Math.ceil(averageDelete);
        fs.outputJsonSync(resultsFileDelete, resultsDelete);

        const resultsFileEdit = '../results/todo-edit.json';
        fs.ensureFileSync(resultsFileEdit);
        let resultsEdit = fs.readJsonSync(resultsFileEdit);
        let averageEdit = await benchEdit(element, element.todo.url);
        console.log(`\nAverage time for edition : ${Math.ceil(averageEdit)} ms\n`);
        resultsEdit[element.slug] = Math.ceil(averageEdit);
        fs.outputJsonSync(resultsFileEdit, resultsEdit);
    }
})();