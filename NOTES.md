# Notes

## 1. No Build Library Notes

### 1.1 Using Vue3 Without a Build Process

Vue3 is reasonably usable without a build step, especially if you don't need Single File Components (SFC).

There are two main usable dist files:

* `vue.global.prod.js` puts vue in the global namespace
* `vue.esm-browser.prod.js` requires the use of es6 imports
* For an explanation of the available files review <https://unpkg.com/browse/vue@3/README.md>

There are a couple places to get these files but <https://unpkg.com/browse/vue@3/dist/>
is a good place. Note that this url will resolve to the most recent vue version, e.g.
<https://unpkg.com/browse/vue@3.2.45/dist/>.

To fetch example files:

```sh
wget https://unpkg.com/vue@3.2.45/dist/vue.global.prod.js
wget https://unpkg.com/vue@3.2.45/dist/vue.esm-browser.prod.js
```

Further links:

* [General Vue3 notes](https://vuejs.org/guide/quick-start.html#download-and-self-host)
* [Using import maps](https://vuejs.org/guide/quick-start.html#enabling-import-maps)


### 1.2 Using Tailwind Without a Build Process

Tailwind has a CDN based script that you can just drop into your page to enable tailwind: <https://tailwindcss.com/docs/installation/play-cdn>

I'm not 100% sure how it works, as it must scan your html and linked js for tailwind class names. If you want to self host that (you should), you can directly fetch it with a call like:

```sh
wget https://cdn.tailwindcss.com/3.2.4
```

Older versions of tailwind had the full set of classes available in a single large file (e.g. <https://www.unpkg.com/browse/tailwindcss@2.2.19/dist/>), but version 3.0+ no longer seem to generate that.
