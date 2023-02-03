# SPA Structure

This is an SPA setup that I have found works pretty effectively.

Core tenets:

* Use a global data management pattern as much as possible
* Add a global singleton object to the vue components that provides access to the globals

## Dependencies

The idea is to just depend on `Vue3`.
We are also using Vue's 

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


## Interfacing with non Vue Components

Now what if we have a system that is not vue based (like a canvas or svg engine),
how can we hook it into the overall system?

Let's check on some options

* since we want to use a global state system, updating a reactive attribute can just use the
  appropriate data manager method
* to listen for update, look at:
    * adding a reactive listener with vue systems
    * make some of the data manager handlers handle this themselves
    * similar to above, but implement a MessageHub
        * we can then register vue components with the MessageHub to get updates
    * we can "shadow" MessageHub channels in the a reactive vue store with something like
      `this.msghub = reactive({});`

## Things to Test

* How can we add key/value to a setup reactive store?
    * probably as simple as `this.store.new_key = "value"`


## How to do things


Let's consider the following mapping:


/                        => list of authors
/auth/<author>/          => author info + list of posts
/auth/<author>/<post>/   => specific post
/tag/<tag>               => composite of authors and posts as relevant

In a subcomponent how should we fetch from a larger set of items?

A couple options:

we keep a global uistate object that help synchronize sub filtering
=> awkward because it seems a little brittle and you have to fork multiple things

We use a prop sent down that can be used as a filter in a computed pull from the
global store

For the above, we also implement using vue router to set this up

How do we generate composite object trees? From multiple discrete data sources















