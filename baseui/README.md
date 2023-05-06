# Initial Setup for baseui

Note we likely don't need to do all this will the baseui setup as is.

```sh
$ npm create -y vite@latest baseui -- --template vue
#> --snip--

# Install dependencies
$ cd baseui/
$ npm install
$ npm install tailwindcss@latest
$ npm install postcss@latest
$ npm install autoprefixer@latest
$ npm install postcss-import@latest
$ npm install @tailwindcss/forms@latest

# Generate baseline configs
$ npx tailwindcss init -p

# Update local gitignore
# Note we could also add `package-lock.json`
$ echo "node_modules/" >> .gitignore
$ echo "dist/" >> .gitignore
```

Next I copied in the files here to override.

To build:

```sh
$ npx vite build
```

