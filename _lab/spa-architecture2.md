# A SPA Sketch

## Abstraction

Let's revisit a certain setup with data classes like so:

* Collection
* Object
* Status

Now we want a path mapping like:

```sh
/       =>  [ c for c in collection ]
/c/:id  =>  collection info
                [ o for o in collection where o.c_id==:id ]
/o/:id
        =>  object info
                <- /c/:id
/s
        => status
```

from server then we want to be able at basic to:

```
fetch
    /c/
    /c/:id
    /o/
    /o/:id
    /s/
```

Our data manager fetch flow might look like:

```sh
start
path = /
fetch /c/ => resp
    => store.c = resp
path = /c/:id
    push cycle:
        fetch /c/:id => resp
        store.c[id] = resp
        fetch /o/?c_id=id => resp
        resp.forEach(e => store.o[e.id] = o)
path = /o/:id
    pop cycle
    push cycle
        fetch /o/:id => resp
        store.o[id] = resp
```


## Specifics

### Alias

Note we can also use an alias to easily make `/` and `/c/` map to the same place <https://router.vuejs.org/guide/essentials/redirect-and-alias.html#alias>


### Main Router Guard

What would be ideal is a universal trigger on any path change so we can setup/teardown data and update cycles.

We can apply global guards which is probably better than per route guards in this use case:

```javascript
const router = createRouter({ ... })

router.beforeEach((to, from) => {
  // ...
  // explicitly return false to cancel the navigation
  return false
});
```

from <https://router.vuejs.org/guide/advanced/navigation-guards.html#global-before-guards>.
Also see <https://router.vuejs.org/guide/advanced/navigation-guards.html#the-full-navigation-resolution-flow>

Note that vue router's recommended data fetching method using life cycle hooks in the components: <https://router.vuejs.org/guide/advanced/data-fetching.html>. This looks like it will work less well for our pattern, as we want more centralized control.


### Handling Components

Within a component we can do something like:

```javascript
{
    computed: {
        id(){ return this.$route.params.id; },
        obj(){ return this.$G.store.objects[this.id]; }
    }
}
```

Though we should test/consider issues raised by <https://router.vuejs.org/guide/essentials/dynamic-matching.html#reacting-to-params-changes>

However, the props pattern <https://router.vuejs.org/guide/essentials/passing-props.html> is probably a cleaner way than the computed pattern above. Still worth checking what happens on same path updating just :id.





