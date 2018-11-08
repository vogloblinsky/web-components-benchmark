module.exports = {
    wc: [{
        name: 'Native',
        slug: 'native',
        version: ''
    }, {
        name: 'Atomico',
        slug: 'atomico',
        version: require('../todomvc/atomico/package.json').dependencies['atomico']
    }, {
        name: 'hyperHTML',
        slug: 'hyperhtml',
        version: require('../todomvc/native-shadow-dom_hyperHTML/package.json').dependencies['hyperhtml']
    }, {
        name: 'LitElement',
        slug: 'lit-element',
        version: require('../todomvc/lit-element/package.json').dependencies['@polymer/lit-element']
    }, {
        name: 'Polymer 3',
        slug: 'polymer-3',
        version: require('../todomvc/polymer3/package.json').dependencies['@polymer/polymer']
    }, {
        name: 'Riot',
        slug: 'riot',
        version: require('../todomvc/riot/package.json').dependencies['riot']
    }, {
        name: 'SkateJS & lit-html',
        slug: 'skatejs-lithtml',
        version: require('../todomvc/skatejs-lit-html/package.json').dependencies['@skatejs/renderer-lit-html']
    }, {
        name: 'SkateJS & Preact',
        slug: 'skatejs-lithtml',
        version: require('../todomvc/skatejs-preact/package.json').dependencies['@skatejs/renderer-preact']
    }, {
        name: 'Slim.js',
        slug: 'slim.js',
        version: require('../todomvc/slim.js/package.json').dependencies['slim-js']
    }, {
        name: 'Stencil',
        slug: 'stencil',
        version: require('../todomvc/stencil/package.json').dependencies['@stencil/core']
    }, {
        name: 'Svelte',
        slug: 'svelte',
        version: require('../todomvc/svelte/package.json').dependencies['svelte']
    }],
    fw: [{
        name: 'Vue.js',
        slug: 'vue.js',
        version: require('../todomvc/vue.js/package.json').dependencies.vue
    }, {
        name: 'Angular Elements',
        slug: 'angular-elements',
        version: require('../todomvc/angular-elements/package.json').dependencies['@angular/core']
    }]
};