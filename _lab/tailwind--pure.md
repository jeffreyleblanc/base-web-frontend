## Simplest Tailwind

**CHECK that this will actually pickup class in js**

The goal here is build a tailwind css file against a set of sources.

This roughly follows <https://tailwindcss.com/docs/installation>.
Note that instead of using the tailwindcss CLI, you can also just use postcss
<https://tailwindcss.com/docs/installation/using-postcss>

Note if you are using postcss, look at:
https://tailwindcss.com/docs/optimizing-for-production
to make sure its purging


```sh
$ mkdir -p tailwind-html/html-files
$ cd tailwind-html/

# Note that postcss-import isn't strictly needed here
$ npm install tailwindcss@latest
$ npm install postcss@latest
$ npm install autoprefixer@latest
$ npm install postcss-import@latest

$ npx tailwindcss init -p
```

Then edit `tailwind.config.js`:

```js
module.exports = {
  // content: [],
  // becomes =>
  content: ["./html-files/**/*.{html,js}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Note that in the above, tailwind will search for `.html` and `.js` files in `/html-files/...`
to determine which classes to include. You can also include things like `.vue` if you wish.

Notes on how this works and options:

https://tailwindcss.com/docs/content-configuration

Add `src/input.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

And finally `html-files/index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>My Page</title>
    <script type="module" crossorigin src="/static/index.4b37070c.js"></script>
    <link rel="stylesheet" href="/static/index.a28dfe3b.css">
  </head>
  <body>
    <div class="w-screen h-screen absolute">
        <div class="text-red-600">hello</div>
    </div>
  </body>
</html>
```

```sh
$ npx tailwindcss -i ./src/input.css -o ./dist/output.css
# or to minify
$ npx tailwindcss --minify -i ./src/input.css -o ./dist/output.css
```

To see other options (`--content`, `--config`, and `--postcss` for example):

```sh
$ npx tailwindcss -h
```
