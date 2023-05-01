# Esbuild

## Example

Installing `esbuild`:

```sh
# Go to a new directory
$ ls
#> nothing

# Install esbuild
$ npm install --save-exact esbuild
#> added 2 packages in 3s

# Now you have a couple files/directories
$ ls
#> node_modules  package.json  package-lock.json

# And can check on esbuild
$ ./node_modules/.bin/esbuild --version
#> 0.17.18
```

Make some sources, `src/helper.js` and `src/main.js`:

```javascript
// src/helper.js
export function helper_meth(){
    console.log('I am a helper');
}

// main.js
import {helper_meth} from './helper.js';
async function main(){
    console.log('hello');
    helper_meth();
    const resp = await window.fetch('/api/endpoint');
    const json = await resp.json();
    console.log('==>',json);
    console.log(JSON.stringify(json));
}
```

We can also add a "scripts" to `package.json`:

```json
{
  "dependencies": {
    "esbuild": "0.17.18"
  },
  "scripts": {
    "build": "esbuild src/main.js --bundle --outfile=dist/compiled.js"
  }
}
```

Running and building code:

```sh
$ npm run build
#> --info--
$ ls dist/
#> compiled.js

# Manually build
$ ./node_modules/.bin/esbuild src/main.js --bundle --outfile=program.js
#> --info--
```


## Links

* <https://esbuild.github.io/getting-started/>

