# SPA Structure

This is an SPA setup that I have found works pretty effectively.

## Dependencies

* tailwind
* vue3

## Basic Ideas

One of the core ideas is that all data going back and forth to server is handling via a `DataManager`:

```js
// global.js

G = {}

// DataManager.js
class DataManager {
    constructor(){
        this.store = reactive({
            user: "Alice",
            data_list: [ 1, 2, 3 ]
        })
    }
}

// main.js
function main(){
    G.data = new DataManager();

    G.app = createApp({
        //...
    });
    G.app.config.globalProperties.$G = G;
    G.app.mount('#mount');
}

```

Now in subcomponents we will tend to use:

```js
{
    data(){ return {
        local_state: true
    } },
    computed: {
        data_list(){ return this.$G.store.data_list; }
    }
}
```

When to use `props`? Definitely for iterated over subcomponents (e.g. something like `UserEntry` from `UserExplorer `).
Also possibly when a subcomponent needs to have a filter passed into it?
Basically when something might have multiple instances.

Now what about shared 'local' state? Such as error handling or overall interaction variables.
Well one option we might have is to do something like:

```js
class DataManager {
    constructor(){
        this.store = reactive({

        });
        this.uistate = reactive({

        });
    }
}
```

So we make two reactive containers. Of course these could be combined if we wanted.
