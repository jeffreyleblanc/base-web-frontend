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

