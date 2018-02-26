# Web components benchmark

Benchmarks of libraries and implementation of Web Components : Native, Polymer 2, Polymer 3, Stencil, Vue.js, SkateJS, Svelte, lit-element

TodoMVC implementation forked from [shprink/web-components-todo](https://github.com/shprink/web-components-todo)

## Angular Elements status

I wait for release of [Angular 6](https://github.com/angular/angular/milestone/81) around march/april 2018 for updating benchmark with Angular Elements results.

## Current results

### Page load (ms) - lower is better

![page-load](./screenshots/benchmark_page-load.png)

### Create 50 items (ms) - lower is better

![create](./screenshots/benchmark_create.png)

### Delete 50 items (ms) - lower is better

![delete](./screenshots/benchmark_delete.png)

### Edit 50 items (ms) - lower is better

![edit](./screenshots/benchmark_edit.png)

## Requirements

* `bower` and `polymer-cli` in global for polymer

> npm install -g bower
> npm install -g polymer-cli

## Setup

> npm i

## Run

In one tab

> npm run serve

In another tab

> npm run benchmark-create-todos

## TODOS

* ~~add SkateJS https://github.com/skatejs/skatejs~~
* ~~add polymer 3 preview https://github.com/Polymer/polymer/tree/3.0-preview~~
* ~~add native + lit-html https://alligator.io/web-components/lit-html/~~
* ~~add svelte https://svelte.technology/guide#custom-elements~~

* add slim.js https://github.com/eavichay/slim.js
* add React implementation ? https://github.com/WeltN24/react-web-component
