const fs = require('fs');
const ejs = require('ejs');

const metas = require('./meta');

const todoLoadResults = require('./todo-load.json');
const todoCreateResults = require('./todo-create.json');

const data = {
    todo: {
        WClibraries: [],
        FW: [],
        max: {}
    },
    pascal: {
        WClibraries: [],
        FW: [],
        max: {}
    }
};

const cleanVersion = (version) => version.replace('^', '');

let maxTodo = {
    size: 0,
    load: 0,
    fmp: 0,
    create: 0,
    delete: 0,
    edit: 0
};
metas.wc.forEach(lib => {
    data.todo.WClibraries.push({
        name: lib.name,
        version: cleanVersion(lib.version),
        size: 0,
        load: todoLoadResults[lib.slug],
        fmp: 0,
        create: todoCreateResults[lib.slug],
        delete: 0,
        edit: 0
    });
    if (todoLoadResults[lib.slug] > maxTodo.load) {
        maxTodo.load = todoLoadResults[lib.slug];
    }
    if (todoCreateResults[lib.slug] > maxTodo.create) {
        maxTodo.create = todoCreateResults[lib.slug];
    }
});
metas.fw.forEach(lib => {
    data.todo.FW.push({
        name: lib.name,
        version: cleanVersion(lib.version),
        size: 0,
        load: todoLoadResults[lib.slug],
        fmp: 0,
        create: todoCreateResults[lib.slug],
        delete: 0,
        edit: 0
    });
    if (todoLoadResults[lib.slug] > maxTodo.load) {
        maxTodo.load = todoLoadResults[lib.slug];
    }
    if (todoCreateResults[lib.slug] > maxTodo.create) {
        maxTodo.create = todoCreateResults[lib.slug];
    }
});
data.todo.max = maxTodo;
data.todo.max = maxTodo;

ejs.renderFile('./results/index.ejs', data, {}, function(err, str) {
    fs.writeFile('./dist/index.html', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});