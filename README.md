# Web components benchmark

[Live results](https://vogloblinsky.github.io/web-components-benchmark/)

Benchmarks of libraries and implementation of Web Components.

The benchmark consists of two different applications :

-   TodoMVC implementation forked from [shprink/web-components-todo](https://github.com/shprink/web-components-todo)

![screenshot_todomvc](common/screenshot_todomvc.png)

-   Pascal triangle

![screenshot_pascal](common/screenshot_pascal.png)

# Requirements

Node.js 10+

## Setup

```
> npm i
> cd todomvc && npm i
> bash install-all.sh
> npm run build:all
> cd pascal-triangle && npm i
> bash install-all.sh
> npm run build:all
```

## Run benchmark for todos

In one tab

```
// In root folder
> npm run serve
```

In another tab

```
> npm run run:benchmark
```

## Run benchmark for pascal-triangle

In one tab

```
// In root folder
> npm run serve
```

In another tab

```
> npm run run:benchmark
```

## Compile results

```
> npm run compile-results
> npm run fix-stencil
```

# Current results

## TodoMVC

https://vogloblinsky.github.io/web-components-benchmark/#todo

## Pascal triangle

https://vogloblinsky.github.io/web-components-benchmark/#pascal
