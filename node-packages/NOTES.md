# Node Module Walk Through

## Dependencies

```sh
$ apt-get install nodejs npm
```

## Making a Module

```sh
$ mkdir testmod
$ cd testmod
$ npm init -y
#> will create package.json
```

Where `package.json` looks like the following:

```json
{
  "name": "testmod",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

We can obviously edit that as needed, but one first thing we will do is **add**:

```json
{
    --snip--
    "type": "module",
    --snip--
}
```

Which will allow us to use es6 import/export statements.

Now we will make an `index.js`:

```js
class Item {
  constructor(name, description) {
    this.name = name;
    this.description = description;
  }
}

export const item_library = [
  new Item("cpu", "Central Processing Unit"),
  new Item("ram", "Random Access Memory"),
  new Item("gpu", "Graphics Processing Unit")
];

export function get_random_item(){
  return item_library[Math.floor(Math.random()*item_library.length)];
}
```

So now our module has the following structure:

```sh
testmod/
├── index.js
└── package.json
```


## Using the Module

Make a mainapp

```sh
$ cd ..
$ mkdir mainapp && cd mainapp/
$ npm init -y
```

Now add `"type" : "module"` in `package.json` like we did in `testmod`.

Now make `index.js`:

```js
import {get_random_item} from "testmod"

const item = get_random_item();
console.log(`The term ${item.name} mean ${item.description}`);
```

At this point our project looks like:

```sh
.
├── index.js
└── package.json
```

Then install:

```sh
$ npm install --save ../testmod
#> added 1 package, and audited 2 packages in 434ms
#> found 0 vulnerabilities
```

And the project looks like:

```sh
.
├── index.js
├── node_modules
│   ├── .package-lock.json
│   └── testmod
│       ├── index.js
│       └── package.json
├── package.json
└── package-lock.json
```

With a dependency part added to `package.json`:

```json
{
  --snip--
  "dependencies": {
    "testmod": "file:../testmod"
  }
}
```

Then run:

```sh
$ node index.js
#> The term gpu mean Graphics Processing Unit
$ node index.js
#> The term cpu mean Central Processing Unit
$ node index.js
#> The term ram mean Random Access Memory
```

And note we can:

```sh
$ npm uninstall testmod
```




