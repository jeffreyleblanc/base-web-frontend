# Data Patterns for SPA

## Overview

This file goes along with `data-patterns.js` in the same folder.

The goal is to describe in generic and specific implementation terms
different functions and patterns for SPA style code, specifically
using Vue3 reactive model.

## Problem Statements

This is for systems that need to use groups of data.
Let's outline where this data may come from and how.

* source
    * be locally static and stored
    * be locally generated
    * be on a server and streamed over a socket
    * be on a server and fetched via GET/POST
* nature
    * (socket)      all the relevant remote data deltas are pushed
    * (fetch/rpc)   all the relevant remote data is pulled at once
    * (fetch/rpc)   data is too large, and thus fetched with filters
                    and/or pagination via a sort

So we want to make sure the patterns we build handle these cases.


What problem are we trying to solve?

* Centralizing and Standardizing object set interface
    * handle the following kinds of data sync
        * stream of per object updates
        * syncing whole lists of object returned from a query
* We want to be able to access the objects as plain objects
    * To do non UI things
    * To use vanilla js to sync parts of the interface to the data
* We potentially want to only explose `Object.freeze` wrapped lists
    * this improves performance on many objects in some cases and doesn't
      impact of dom update that much in practice
    * can reduce copies of tracked objects
* We want to make available as "views" reactive lists of the objects based on:
    * filter criteria
    * sorting criteria
    * pagination critera
    * provide a reactive interface to update the view criteria
* We want a mechanism to inform "listners" of events on objects

## Understanding Reactivity and It's effects

To inform this discussion first read:

* <https://vuejs.org/guide/essentials/reactivity-fundamentals.html>
* <https://vuejs.org/guide/essentials/computed.html>
    * in particular as a way to access reactive objects
* <https://vuejs.org/guide/extras/reactivity-in-depth.html>
    * "In Vue 3, Proxies are used for reactive objects and getter / setters are used for refs."
    * `watchEffect` might be used to tie non vue code into the reactive system
    * key section: <https://vuejs.org/guide/extras/reactivity-in-depth.html#integration-with-external-state-systems>

interesting reference to immer <https://immerjs.github.io/immer/> which I've also seen with react.

Some notes:

* https://vuejs.org/guide/essentials/reactivity-fundamentals.html#reactive-proxy-vs-original

> When you access this.someObject after assigning it, the value is a reactive proxy of the original newObject.
> Unlike in Vue 2, the original newObject is left intact and will not be made reactive:
> make sure to always access reactive state as a property of this.

Topics to integrate:

* <https://vuejs.org/api/reactivity-advanced.html#shallowreactive>
    * in the ObjectTracker the above could be used instead of freezing etc...
* <https://vuejs.org/guide/best-practices/performance.html#reduce-reactivity-overhead-for-large-immutable-structures>

Note we probably want to make use of shallowRef and shallowReactive instead of Object.freeze?

### Experiments to Preform

```javascript
import {reactive} from "vue"

const obj = { a: 1, b: 2 };
const l = reactive([]);
const m = reactive({});

l.push(obj);
m["key"] = obj;
// l[0] === m["key"] === obj ?
```

relationships

```javascript

Map of vanilla objects
list of vanilla objects
=> Map/list share same "pool" of objects
=> so for example if we get an "update" to an object
=> we can either
    * update one of the references with new k:v
    * replace the old entry with the new object in *both* list and map
```

Question:

we are typically *displaying* data in the following formats:

* as a single entry
* as a list of objects

for each we have options:

* NOTE that `Object.freeze` freezes the object! It doesn't just shield it from becoming reactive.
* single entry
    * as a fully reactive direct level object
    * as a reactive obj with a frozen ref, e.g. `ref = reactive({ obj: frozen(obj) })`
      where to update we do ref.obj = frozen(obj);
* a single list:
    * as a fully reactive object
    * as a reactive list of frozen objects
    * as a frozen refernce e.g. `ref = reactive({ list: [] });
      where we update like: `ref.list = frozen(lst.filter())`


## Pathways and Structures

Different ingest pathways/store:

```python
net => obj
    obj => ingest
        obj => vue reference

# Note the Map[pk] is reactive here?
net => obj
    obj => ingest
        obj => Map(pk:obj)
        obj => reactive_obj

net => obj
    obj => ingest
        obj => Map(pk:obj)
        obj => clone() => reactive_obj

# Issue here, we freeze the Map one because it's the same
# but may that's ok?
net => obj
    obj => ingest
        obj => Map
        obj => Object.freeze(obj) => reactive_obj
        # above is also probably equivilant to:
        obj => Object.freeze(obj)
            => fobj
                fobj => Map
                fpbj => reactive_obj
```

For the different ingest pathways, its worth then thinking about
how the different:

* update and deletion patterns
* usage patterns for:
    * vanilla analysis
    * vanilla UI
    * vue UI

Would work with each of the above pathways/stores

