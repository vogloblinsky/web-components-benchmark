const stencilTodoInfos = require('../todomvc/stencil/www/build/app/app.registry.json');

module.exports = {
    wc: [{
            name: 'Native',
            slug: 'native',
            version: '',
            github: 'https://github.com/webcomponents/webcomponentsjs',
            stars: '',
            todo: {
                url: 'native-shadow-dom/dist/index.html',
                paths: ['todomvc/native-shadow-dom/dist/bundle.js']
            }
        },
        {
            name: 'Atomico',
            slug: 'atomico',
            github: 'https://github.com/UpperCod/Atomico',
            version: require('../todomvc/atomico/package.json').dependencies[
                'atomico'
            ],
            stars: 160,
            todo: {
                url: 'atomico/public/index.html',
                paths: [
                    'todomvc/atomico/public/atomico.umd.js',
                    'todomvc/atomico/public/atom-todo.iife.js'
                ]
            }
        },
        {
            name: 'hybrids',
            slug: 'Hybrids',
            github: 'https://github.com/hybridsjs/hybrids',
            version: require('../todomvc/hybrids/package.json')
                .dependencies['hybrids'],
            stars: 840,
            todo: {
                url: 'hybrids/dist/index.html',
                paths: ['todomvc/hybrids/dist/bundle.js']
            }
        },
        {
            name: 'hyperHTML',
            slug: 'hyperhtml',
            github: 'https://github.com/WebReflection/hyperHTML',
            version: require('../todomvc/native-shadow-dom_hyperHTML/package.json')
                .dependencies['hyperhtml'],
            stars: 2045,
            todo: {
                url: 'native-shadow-dom_hyperHTML/dist/index.html',
                paths: ['todomvc/native-shadow-dom_hyperHTML/dist/bundle.js']
            }
        },
        {
            name: 'LitElement',
            slug: 'lit-element',
            github: 'https://github.com/Polymer/lit-element',
            version: require('../todomvc/lit-element/package.json')
                .dependencies['@polymer/lit-element'],
            stars: 897,
            todo: {
                url: 'lit-element/dist/index.html',
                paths: ['todomvc/lit-element/dist/bundle.js']
            }
        },
        {
            name: 'Omi',
            slug: 'omi',
            github: 'https://github.com/Tencent/omi',
            version: require('../todomvc/omi/package.json').dependencies['omi'],
            stars: 5304,
            todo: {
                url: 'omi/dist/index.html',
                paths: ['todomvc/omi/dist/bundle.js']
            }
        },
        {
            name: 'Polymer 3',
            slug: 'polymer-3',
            github: 'https://github.com/Polymer/polymer',
            version: require('../todomvc/polymer3/package.json').dependencies[
                '@polymer/polymer'
            ],
            stars: 20380,
            todo: {
                url: 'polymer3/build/es6-unbundled/index.html',
                paths: ['todomvc/polymer3/build/es6-unbundled/bundle.js']
            }
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
            todo: {
                url: 'riot/dist/index.html',
                paths: ['todomvc/riot/dist/bundle.js']
            }
        },
        {
            name: 'SkateJS & lit-html',
            slug: 'skatejs-lithtml',
            github: 'https://github.com/skatejs/skatejs',
            version: require('../todomvc/skatejs-lit-html/package.json')
                .dependencies['@skatejs/renderer-lit-html'],
            stars: 2796,
            todo: {
                url: 'skatejs-lit-html/',
                paths: ['todomvc/skatejs-lit-html/dist/main.js']
            }
        },
        {
            name: 'SkateJS & Preact',
            slug: 'skatejs-preact',
            github: 'https://github.com/skatejs/skatejs',
            version: require('../todomvc/skatejs-preact/package.json')
                .dependencies['@skatejs/renderer-preact'],
            stars: 2796,
            todo: {
                url: 'skatejs-preact/',
                paths: ['todomvc/skatejs-preact/dist/main.js']
            }
        },
        {
            name: 'Slim.js',
            slug: 'slim.js',
            github: 'https://github.com/slimjs/slim.js',
            version: require('../todomvc/slim.js/package.json').dependencies[
                'slim-js'
            ],
            stars: 548,
            todo: {
                url: 'slim.js/dist/index.html',
                paths: ['todomvc/slim.js/dist/bundle.js']
            }
        },
        {
            name: 'Stencil',
            slug: 'stencil',
            github: 'https://github.com/ionic-team/stencil',
            version: require('../todomvc/stencil/package.json').dependencies[
                '@stencil/core'
            ],
            stars: 4238,
            todo: {
                url: 'stencil/www/index.html',
                paths: [
                    `todomvc/stencil/www/build/app/${stencilTodoInfos.core}`,
                    `todomvc/stencil/www/build/app/${
                        stencilTodoInfos.components['my-todo'].bundleIds.$
                    }.entry.js`,
                    `todomvc/stencil/www/build/app/${
                        stencilTodoInfos.components['todo-input'].bundleIds.$
                    }.entry.js`,
                    `todomvc/stencil/www/build/app/${
                        stencilTodoInfos.components['todo-item'].bundleIds.$
                    }.entry.js`
                ]
            }
        },
        {
            name: 'Svelte',
            slug: 'svelte',
            github: 'https://github.com/sveltejs/svelte',
            version: require('../todomvc/svelte/package.json').dependencies[
                'svelte'
            ],
            stars: 8306,
            todo: {
                url: 'svelte/public/index.html',
                paths: ['todomvc/svelte/public/bundle.js']
            }
        }
    ],
    fw: [{
            name: 'Angular Elements',
            slug: 'angular-elements',
            github: 'https://github.com/angular/angular',
            version: require('../todomvc/angular-elements/package.json')
                .dependencies['@angular/core'],
            stars: 42492,
            todo: {
                url: 'angular-elements/dist/index.html',
                paths: ['todomvc/angular-elements/dist/main.bundle.js']
            }
        },
        {
            name: 'Vue.js',
            slug: 'vue.js',
            github: 'https://github.com/vuejs/vue',
            version: require('../todomvc/vue.js/package.json').dependencies.vue,
            stars: 118622,
            todo: {
                url: 'vue.js/dist/index.html',
                paths: [
                    'todomvc/vue.js/node_modules/vue/dist/vue.min.js',
                    'todomvc/vue.js/dist/build.js'
                ]
            }
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
            todo: {
                url: 'dojo2/output/index.html',
                paths: ['todomvc/dojo2/output/dist/index/index-1.0.0.js']
            }
        }
    ]
};