const fs = require('fs');
const ejs = require('ejs');
const zlib = require('zlib');

const metas = require('./meta');

const queryStars = require('./query-stars');

const todoLoadResults = require('./todo-load.json');
const todoCreateResults = require('./todo-create.json');
const todoDeleteResults = require('./todo-delete.json');
const todoEditResults = require('./todo-edit.json');
const todoTTIResults = require('./todo-tti.json');

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

const filesizeGzipped = (project) => {
    if (project.paths) {
        return (project.paths.reduce((previous, current) => {
            const exists = fs.existsSync(`${current}`);
            if (!exists) return undefined;
            const fileContents = fs.readFileSync(`${current}`);
            const zippedContent = zlib.gzipSync(fileContents.toString());
            fs.writeFileSync(`${current}.gzip`, zippedContent);
            const size = previous + fs.statSync(`${current}.gzip`).size;
            fs.unlinkSync(`${current}.gzip`);
            return size;
        }, 0) / 1000).toFixed(1);
    } else {
        return 0;
    }
};

let maxTodo = {
    size: 0,
    load: 0,
    tti: 0,
    fmp: 0,
    create: 0,
    delete: 0,
    edit: 0
};

metas.wc.forEach((lib) => {
    lib.todo.size = parseFloat(filesizeGzipped(lib.todo));
    data.todo.WClibraries.push({
        name: lib.name,
        stars: lib.stars,
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
});
metas.fw.forEach(lib => {
    lib.todo.size = parseFloat(filesizeGzipped(lib.todo));
    data.todo.FW.push({
        name: lib.name,
        stars: lib.stars,
        version: cleanVersion(lib.version),
        load: todoLoadResults[lib.slug],
        create: todoCreateResults[lib.slug],
        delete: todoDeleteResults[lib.slug],
        edit: todoEditResults[lib.slug],
        size: lib.todo.size,
        tti: todoTTIResults[lib.slug]
    });
    if ((lib.todo.size > maxTodo.size)) {
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
});

data.todo.max = maxTodo;
data.pascal.max = maxTodo;

ejs.renderFile('./results/index.ejs', data, {}, function(err, str) {
    fs.writeFile('./docs/index.html', str, (err) => {
        if (err) throw err;
        console.log('The file has been saved!');
    });
});