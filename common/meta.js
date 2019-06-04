const stencilTodoInfos = require('../todomvc/stencil/dist/build/app/app.registry.json');

module.exports = {
    wc: [
        {
            name: 'Native',
            slug: 'native',
            version: '',
            github: 'https://github.com/webcomponents/webcomponentsjs',
            stars: '',
            paths: ['native/dist/bundle.js']
        },
        {
            name: 'Hybrids',
            slug: 'hybrids',
            github: 'https://github.com/hybridsjs/hybrids',
            version: require('../todomvc/hybrids/package.json').dependencies[
                'hybrids'
            ],
            stars: 1288,
            paths: ['hybrids/dist/bundle.js']
        },
        {
            name: 'HyperHTMLElement',
            slug: 'hyperHTMLElement',
            github: 'https://github.com/WebReflection/hyperHTML-Element',
            version: require('../todomvc/hyperHTMLElement/package.json')
                .dependencies['hyperhtml-element'],
            stars: 141,
            paths: ['hyperHTMLElement/dist/bundle.js']
        },
        {
            name: 'LitElement',
            slug: 'lit-element',
            github: 'https://github.com/Polymer/lit-element',
            version: require('../todomvc/lit-element/package.json')
                .dependencies['lit-element'],
            stars: 2169,
            paths: ['lit-element/dist/bundle.js']
        },
        {
            name: 'Omi',
            slug: 'omi',
            github: 'https://github.com/Tencent/omi',
            version: require('../todomvc/omi/package.json').dependencies['omi'],
            stars: 8900,
            paths: ['omi/dist/bundle.js']
        },
        /*,
                {
                    name: 'Polymer 3',
                    slug: 'polymer-3',
                    github: 'https://github.com/Polymer/polymer',
                    version: require('../todomvc/polymer-3/package.json').dependencies[
                        '@polymer/polymer'
                    ],
                    stars: 20380,
                    paths: ['polymer-3/dist/bundle.js']
                }*/
        {
            name: 'Riot',
            slug: 'riot',
            github: 'https://github.com/riot/riot',
            version: require('../todomvc/riot/package.json').dependencies[
                'riot'
            ],
            stars: 13682,
            noshadowdom: true,
            paths: ['riot/dist/bundle.js']
        },
        {
            name: 'SkateJS & lit-html',
            slug: 'skatejs-lit-html',
            github: 'https://github.com/skatejs/skatejs',
            version: require('../todomvc/skatejs-lit-html/package.json')
                .dependencies['@skatejs/renderer-lit-html'],
            stars: 2991,
            paths: ['skatejs-lit-html/dist/main.js']
        },
        {
            name: 'SkateJS & Preact',
            slug: 'skatejs-preact',
            github: 'https://github.com/skatejs/skatejs',
            version: require('../todomvc/skatejs-preact/package.json')
                .dependencies['@skatejs/renderer-preact'],
            stars: 2991,
            paths: ['skatejs-preact/dist/main.js']
        },
        {
            name: 'Slim.js',
            slug: 'slim.js',
            github: 'https://github.com/slimjs/slim.js',
            version: require('../todomvc/slim.js/package.json').dependencies[
                'slim-js'
            ],
            stars: 643,
            paths: ['slim.js/dist/bundle.js']
        },
        {
            name: 'Solid',
            slug: 'solid',
            github: 'https://github.com/ryansolid/solid',
            version: require('../todomvc/solid/package.json').dependencies[
                'solid-element'
            ],
            stars: 533,
            paths: ['solid/dist/bundle.js']
        },
        {
            name: 'Stencil',
            slug: 'stencil',
            github: 'https://github.com/ionic-team/stencil',
            version: require('../todomvc/stencil/package.json').dependencies[
                '@stencil/core'
            ],
            stars: 5608,
            pathsTodo: [
                `stencil/dist/build/app/${stencilTodoInfos.core}`,
                `stencil/dist/build/app/${
                    stencilTodoInfos.components['my-todo'].bundleIds.$
                }.entry.js`,
                `stencil/dist/build/app/${
                    stencilTodoInfos.components['todo-input'].bundleIds.$
                }.entry.js`,
                `stencil/dist/build/app/${
                    stencilTodoInfos.components['todo-item'].bundleIds.$
                }.entry.js`
            ],
            pathsPascal: [
                `stencil/dist/build/app.esm.js`,
                `stencil/dist/build/p-458528c5.js`,
                `stencil/dist/build/pascal-triangle_2.entry.js`
            ]
        },
        {
            name: 'Svelte',
            slug: 'svelte',
            github: 'https://github.com/sveltejs/svelte',
            version: require('../todomvc/svelte/package.json').dependencies[
                'svelte'
            ],
            stars: 17839,
            paths: ['svelte/dist/bundle.js']
        }
    ],
    fw: [
        {
            name: 'Angular Elements',
            slug: 'angular-elements',
            github: 'https://github.com/angular/angular',
            version: require('../todomvc/angular-elements/package.json')
                .dependencies['@angular/core'],
            stars: 48702,
            paths: ['angular-elements/dist/main.bundle.js']
        },
        {
            name: 'Angular Elements Ivy',
            slug: 'angular-elements-ivy',
            github: 'https://github.com/angular/angular',
            version: require('../todomvc/angular-elements-ivy/package.json')
                .dependencies['@angular/core'],
            stars: 48702,
            paths: ['angular-elements-ivy/dist/main-es2015.js']
        },
        {
            name: 'Vue.js',
            slug: 'vue.js',
            github: 'https://github.com/vuejs/vue',
            version: require('../todomvc/vue.js/package.json').dependencies.vue,
            stars: 140129,
            paths: [
                'vue.js/node_modules/vue/dist/vue.min.js',
                'vue.js/dist/build.js'
            ]
        },
        {
            name: 'Dojo',
            slug: 'dojo',
            github: 'https://github.com/dojo/framework',
            version: require('../todomvc/dojo/package.json').dependencies[
                '@dojo/framework'
            ],
            stars: 150,
            noshadowdom: true,
            paths: ['dojo/dist/dist/index/index-1.0.0.js']
        }
    ]
};
