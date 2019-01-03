const format = require('date-fns/format');

const fs = require('fs-extra');
const ejs = require('ejs');
const zlib = require('zlib');

const metas = require('./meta');

const todoLoadResults = require('../results/todo-load.json');
const todoCreateResults = require('../results/todo-create.json');
const todoDeleteResults = require('../results/todo-delete.json');
const todoEditResults = require('../results/todo-edit.json');
const todoTTIResults = require('../results/todo-tti.json');

console.log(todoLoadResults);
console.log(todoCreateResults);
console.log(todoDeleteResults);
console.log(todoEditResults);
console.log(todoTTIResults);

const pascalLoadResults = require('../results/pascal-triangle-load.json');
const pascalTTIResults = require('../results/pascal-triangle-tti.json');

console.log(pascalLoadResults);
console.log(pascalTTIResults);

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

const cleanVersion = version => version.replace('^', '');

const filesizeGzipped = (project, namespace) => {
    let paths = project.paths;
    if (project.slug === 'stencil') {
        switch (namespace) {
            case 'pascal-triangle':
                paths = project.pathsPascal;
                break;
            case 'todomvc':
                paths = project.pathsTodo;
            default:
                break;
        }
    }
    if (paths) {
        return (
            paths.reduce((previous, current) => {
                const exists = fs.existsSync(`${namespace}/${current}`);
                if (!exists) return undefined;
                const fileContents = fs.readFileSync(`${namespace}/${current}`);
                const zippedContent = zlib.gzipSync(fileContents.toString());
                fs.writeFileSync(`${namespace}/${current}.gzip`, zippedContent);
                const size =
                    previous + fs.statSync(`${namespace}/${current}.gzip`).size;
                fs.unlinkSync(`${namespace}/${current}.gzip`);
                return size;
            }, 0) / 1000
        ).toFixed(1);
    } else {
        return 0;
    }
};

let maxTodo = {
    size: 0,
    load: 0,
    tti: 0,
    create: 0,
    delete: 0,
    edit: 0
};

let maxPascal = {
    size: 0,
    load: 0,
    tti: 0
};

metas.wc.forEach(lib => {
    lib.todo = {};
    lib.todo.size = parseFloat(filesizeGzipped(lib, 'todomvc'));
    data.todo.WClibraries.push({
        name: lib.name,
        stars: lib.stars,
        slug: lib.slug,
        version: cleanVersion(lib.version),
        load: todoLoadResults[lib.slug],
        create: todoCreateResults[lib.slug],
        delete: todoDeleteResults[lib.slug],
        edit: todoEditResults[lib.slug],
        size: lib.todo.size,
        tti: todoTTIResults[lib.slug]
    });
    if (lib.todo.size > maxTodo.size) {
        maxTodo.size = lib.todo.size;
    }
    if (todoLoadResults[lib.slug] > maxTodo.load) {
        maxTodo.load = todoLoadResults[lib.slug];
    }
    if (todoCreateResults[lib.slug] > maxTodo.create) {
        maxTodo.create = todoCreateResults[lib.slug];
    }
    if (todoDeleteResults[lib.slug] > maxTodo.delete) {
        maxTodo.delete = todoDeleteResults[lib.slug];
    }
    if (todoEditResults[lib.slug] > maxTodo.edit) {
        maxTodo.edit = todoEditResults[lib.slug];
    }
    if (todoTTIResults[lib.slug] > maxTodo.tti) {
        maxTodo.tti = todoTTIResults[lib.slug];
    }

    lib.pascal = {};
    lib.pascal.size = parseFloat(filesizeGzipped(lib, 'pascal-triangle'));

    if (pascalLoadResults[lib.slug]) {
        data.pascal.WClibraries.push({
            name: lib.name,
            stars: lib.stars,
            slug: lib.slug,
            version: cleanVersion(lib.version),
            load: pascalLoadResults[lib.slug],
            size: lib.pascal.size,
            tti: pascalTTIResults[lib.slug]
        });
        if (lib.pascal.size > maxPascal.size) {
            maxPascal.size = lib.pascal.size;
        }
        if (pascalLoadResults[lib.slug] > maxPascal.load) {
            maxPascal.load = pascalLoadResults[lib.slug];
        }
        if (pascalTTIResults[lib.slug] > maxPascal.tti) {
            maxPascal.tti = pascalTTIResults[lib.slug];
        }
    }
});
metas.fw.forEach(lib => {
    lib.todo = {};
    lib.todo.size = parseFloat(filesizeGzipped(lib, 'todomvc'));
    data.todo.FW.push({
        name: lib.name,
        stars: lib.stars,
        slug: lib.slug,
        version: cleanVersion(lib.version),
        load: todoLoadResults[lib.slug],
        create: todoCreateResults[lib.slug],
        delete: todoDeleteResults[lib.slug],
        edit: todoEditResults[lib.slug],
        size: lib.todo.size,
        tti: todoTTIResults[lib.slug]
    });
    if (lib.todo.size > maxTodo.size) {
        maxTodo.size = lib.todo.size;
    }
    if (todoLoadResults[lib.slug] > maxTodo.load) {
        maxTodo.load = todoLoadResults[lib.slug];
    }
    if (todoCreateResults[lib.slug] > maxTodo.create) {
        maxTodo.create = todoCreateResults[lib.slug];
    }
    if (todoDeleteResults[lib.slug] > maxTodo.delete) {
        maxTodo.delete = todoDeleteResults[lib.slug];
    }
    if (todoEditResults[lib.slug] > maxTodo.edit) {
        maxTodo.edit = todoEditResults[lib.slug];
    }
    if (todoTTIResults[lib.slug] > maxTodo.tti) {
        maxTodo.tti = todoTTIResults[lib.slug];
    }

    lib.pascal = {};
    lib.pascal.size = parseFloat(filesizeGzipped(lib, 'pascal-triangle'));

    if (pascalLoadResults[lib.slug]) {
        data.pascal.FW.push({
            name: lib.name,
            stars: lib.stars,
            slug: lib.slug,
            version: cleanVersion(lib.version),
            load: pascalLoadResults[lib.slug],
            size: lib.pascal.size,
            tti: pascalTTIResults[lib.slug]
        });
        if (lib.pascal.size > maxPascal.size) {
            maxPascal.size = lib.pascal.size;
        }
        if (pascalLoadResults[lib.slug] > maxPascal.load) {
            maxPascal.load = pascalLoadResults[lib.slug];
        }
        if (pascalTTIResults[lib.slug] > maxPascal.tti) {
            maxPascal.tti = pascalTTIResults[lib.slug];
        }
    }
});

data.todo.max = maxTodo;
data.pascal.max = maxPascal;
data.buildDateAndTime = format(new Date(), 'DD/MM/YYYY - HH:mm:ss');

ejs.renderFile('./common/index.ejs', data, {}, function(err, str) {
    fs.outputFile('./docs/index.html', str, err => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});
