# rollup modern wc

This configuration allows the creation of a modern and light web-component based on rollup and atomico

## Script

```bash
# development mode
npm run dev 
# production mode
npm run build
```

## Directory 
```bash
/src 
  index.js #entry code
/test
/dist #this directory is removed with each rollup cycle
index.html
```

## package.json

By default, rollup loads the initial configuration from package.json:

```bash
{
	"source": "src/index.js", # define the input file for rollup
	"module": "dist/my-wc.mjs", # define the module output mjs
	"unpkg": "dist/my-wc.umd.js", # define the output of umd module
}
```

## support 

### CSS

The css is supported by the plugin [rollup-plugin-postcss](https://github.com/egoist/rollup-plugin-postcss), this librarian allows to extract the css from the

```js
// inline inject css
import "style.js";
// get string css
import css from "style.css";
```

### JS Y TS

supported by [rollup-plugin-sucrase] (https://github.com/rollup/rollup-plugin-sucrase), this library allows manipulation of non-standardized JS and TS code.




