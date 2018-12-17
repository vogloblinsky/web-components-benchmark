const stencilTodoInfos = require('../todomvc/stencil/www/build/app/app.registry.json');
const stencilPascalInfos = require('../pascal-triangle/stencil/www/build/app/app.registry.json');

module.exports = {
    wc: [{
            name: 'Native',
            slug: 'native',
            version: '',
            github: 'https://github.com/webcomponents/webcomponentsjs',
            stars: '',
            url: 'native-shadow-dom/dist',
            paths: ['native-shadow-dom/dist/bundle.js']
        },
        {
            name: 'Atomico',
            slug: 'atomico',
            github: 'https://github.com/UpperCod/Atomico',
            version: require('../todomvc/atomico/package.json').dependencies[
                'atomico'
            ],
            stars: 160,
            url: 'atomico/dist',
            paths: [
                'atomico/public/atomico.umd.js',
                'atomico/public/atom-todo.iife.js'
            ]
        },
        {
            name: 'Hybrids',
            slug: 'hybrids',
            github: 'https://github.com/hybridsjs/hybrids',
            version: require('../todomvc/hybrids/package.json')
                .dependencies['hybrids'],
            stars: 840,
            url: 'hybrids/index.html',
            paths: ['hybrids/dist/bundle.js']
        },
        {
            name: 'hyperHTML',
            slug: 'hyperhtml',
            github: 'https://github.com/WebReflection/hyperHTML',
            version: require('../todomvc/native-shadow-dom_hyperHTML/package.json')
                .dependencies['hyperhtml'],
            stars: 2045,
            url: 'native-shadow-dom_hyperHTML/dist/index.html',
            paths: ['native-shadow-dom_hyperHTML/dist/bundle.js']
        },
        {
            name: 'LitElement',
            slug: 'lit-element',
            github: 'https://github.com/Polymer/lit-element',
            version: require('../todomvc/lit-element/package.json')
                .dependencies['@polymer/lit-element'],
            stars: 897,
            url: 'lit-element/dist/index.html',
            paths: ['lit-element/dist/bundle.js']
        },
        {
            name: 'Omi',
            slug: 'omi',
            github: 'https://github.com/Tencent/omi',
            version: require('../todomvc/omi/package.json').dependencies['omi'],
            stars: 5304,
            url: 'omi/dist/index.html',
            paths: ['omi/dist/bundle.js']
        },
        {
            name: 'Polymer 3',
            slug: 'polymer-3',
            github: 'https://github.com/Polymer/polymer',
            version: require('../todomvc/polymer3/package.json').dependencies[
                '@polymer/polymer'
            ],
            stars: 20380,
            url: 'polymer3/build/es6-unbundled/index.html',
            paths: ['polymer3/build/es6-unbundled/bundle.js']
        },
        {
            name: 'Riot',
            slug: 'riot',
            github: 'https://github.com/riot/riot',
            version: require('../todomvc/riot/package.json').dependencies[
                'riot'
            ],
            stars: 13320,
            noshadowdom: true,
            url: 'riot/dist/index.html',
            paths: ['riot/dist/bundle.js']
        },
        {
            name: 'SkateJS & lit-html',
            slug: 'skatejs-lithtml',
            github: 'https://github.com/skatejs/skatejs',
            version: require('../todomvc/skatejs-lit-html/package.json')
                .dependencies['@skatejs/renderer-lit-html'],
            stars: 2796,
            url: 'skatejs-lit-html/',
            paths: ['skatejs-lit-html/dist/main.js']
        },
        {
            name: 'SkateJS & Preact',
            slug: 'skatejs-preact',
            github: 'https://github.com/skatejs/skatejs',
            version: require('../todomvc/skatejs-preact/package.json')
                .dependencies['@skatejs/renderer-preact'],
            stars: 2796,
            url: 'skatejs-preact/',
            paths: ['skatejs-preact/dist/main.js']
        },
        {
            name: 'Slim.js',
            slug: 'slim.js',
            github: 'https://github.com/slimjs/slim.js',
            version: require('../todomvc/slim.js/package.json').dependencies[
                'slim-js'
            ],
            stars: 548,
            url: 'slim.js/dist/index.html',
            paths: ['slim.js/dist/bundle.js']
        },
        {
            name: 'Stencil',
            slug: 'stencil',
            github: 'https://github.com/ionic-team/stencil',
            version: require('../todomvc/stencil/package.json').dependencies[
                '@stencil/core'
            ],
            stars: 4238,
            url: 'stencil/www/index.html',
            pathsTodo: [
                `stencil/www/build/app/${stencilTodoInfos.core}`,
                `stencil/www/build/app/${
                        stencilTodoInfos.components['my-todo'].bundleIds.$
                    }.entry.js`,
                `stencil/www/build/app/${
                        stencilTodoInfos.components['todo-input'].bundleIds.$
                    }.entry.js`,
                `stencil/www/build/app/${
                        stencilTodoInfos.components['todo-item'].bundleIds.$
                    }.entry.js`
            ],
            pathsPascal: [
                `stencil/www/build/app/${stencilPascalInfos.core}`,
                `stencil/www/build/app/${
                    stencilPascalInfos.components['pascal-triangle'].bundleIds.$
                    }.entry.js`,
                `stencil/www/build/app/${
                    stencilPascalInfos.components['triangle-item'].bundleIds.$
                    }.entry.js`
            ]
        },
        {
            name: 'Svelte',
            slug: 'svelte',
            github: 'https://github.com/sveltejs/svelte',
            version: require('../todomvc/svelte/package.json').dependencies[
                'svelte'
            ],
            stars: 8306,
            url: 'svelte/public/index.html',
            paths: ['svelte/public/bundle.js']
        }
    ],
    fw: [{
            name: 'Angular Elements',
            slug: 'angular-elements',
            github: 'https://github.com/angular/angular',
            version: require('../todomvc/angular-elements/package.json')
                .dependencies['@angular/core'],
            stars: 42492,
            url: 'angular-elements/dist/index.html',
            paths: ['angular-elements/dist/main.bundle.js']
        },
        {
            name: 'Vue.js',
            slug: 'vue.js',
            github: 'https://github.com/vuejs/vue',
            version: require('../todomvc/vue.js/package.json').dependencies.vue,
            stars: 118622,
            url: 'vue.js/dist/index.html',
            paths: [
                'vue.js/node_modules/vue/dist/vue.min.js',
                'vue.js/dist/build.js'
            ]
        },
        {
            name: 'Dojo',
            slug: 'dojo2',
            github: 'https://github.com/dojo/framework',
            version: require('../todomvc/dojo2/package.json').dependencies[
                '@dojo/core'
            ],
            stars: 80,
            noshadowdom: true,
            url: 'dojo2/output/index.html',
            paths: ['dojo2/output/dist/index/index-1.0.0.js']
        }
    ]
};