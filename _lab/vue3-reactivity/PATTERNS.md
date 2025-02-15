

reactive
ref
computed
watchEffect

https://vuejs.org/api/reactivity-core.html
https://vuejs.org/api/reactivity-utilities.html
https://vuejs.org/api/reactivity-advanced.html#reactivity-api-advanced

shallowReactive https://vuejs.org/api/reactivity-advanced.html#shallowreactive

vs https://vuejs.org/api/options-state.html


```js

G.store = reactive({
    objects_by_key: new Map(),
    object_list: []
});

// new object /////////////////////////////////////////////////

G.store.objects_by_key.set(obj.key,obj)
G.store.objects_by_key.object_list.append(obj); // NOW... is this the same object instance? can we share it somehow?
    // BUT... it somehow becomes "Proxied" by vue?
    // if we update in one case... (e.g. the one stored in the map) does it update the others (e.g. the list)?

// instead? to maintain the same object?

G.store.objects_by_key.set(obj.key,obj)
G.store.objects_by_key.object_list.append(
    G.store.objects_by_key.get(obj.key)
)

// Or maybe even better (cleaner)?
G.store = reactive({
    objects_by_key: new Map(),
    object_list: computed(()=>{
        return Array.from(G.store.objects_by_key.values())
    })
});

// Or (???):

G.store = reactive({
    objects_by_key: new Map()
}
// later on... elsewhere
G.store.object_list = computed(()=>{
    return Array.from(G.store.objects_by_key.values())
});


```

## Question 1:

QUESTION: in this pattern where does the reactive trigger take place?

```js
// main.js
G.store = reactive({
    object_list: []
})


// manager.js

get_active_objects(){
    return this.$G.store.object_list.filter(e=>e.active);
}

// Are the results of get_active_objects shared between the components? (seems unlikely)

// component 1
computed: {
    active_objects(){ return this.$G.mng.get_active_objects(); }
}

// component 2
computed: {
    active_objects(){ return this.$G.mng.get_active_objects(); }
}

```

Look at:

<https://www.google.com/search?q=vue3+share+computed+property+between+components>

Also there is this pattern:

```js
import { reactive, computed } from "vue";

const state = reactive({
  hobby: "Hike",
  fruit: "Apple",
  fruitOptions: ["Banana", "Apple", "Pear", "Watermelon"],

  description: computed(() => {
    return `I like eating ${state.fruit}s & ${state.hobby}`;
  }),
});

export default state;
```

From here: <https://dev.to/dperrymorrow/you-no-longer-need-vuex-pinia-for-shared-state-in-vue-4ikp>


## Question 2

Let's say I have:

```js
// Or maybe even better (cleaner)?
G.store = reactive({
    objects_by_key: new Map(),
});
```

And in some random method I want to:

```js
push_change(obj_key){
    const obj = G.store.get(obj);
    talk_to_server(obj.key,obj.value);
}
```

So I'm not changing anything on the object, I'm just referencing stuff.
Does that hook `push_change` up as an effect?
I'd hope not... e.g. I'd assume vue is only turning on that tracking for calls from
stuff like a `computed:` NOT, e.g. `methods:`

I *think* the above is correct, see:

* <https://vuejs.org/guide/essentials/reactivity-fundamentals.html>
* <https://www.google.com/search?q=vue3+are+methods+in+methods+reactive>


## Question 3

Say we have a set of objects we track by their pk, and we have a general store of them:

```js
G.store = reactive({
    obj_by_pk: new Map()
})
```

How best handle:

* maintenance of the store:
    * adding a new object?
    * editing a current object?
        * just replace it fully?
        * just update the changed fields?
        * what if it *isn't* shallow?
    * deleting a current object?
    * checking if an object is in the store?
* subviews into the store
    * total number ot items in the store
    * a sorted and/or filtered list of the items in the store
        * how share such things across multiple components?
    * a set of focused objects, e.g.
        * `G.store.current_obj = null`
        * `G.store.current_obj = G.store.obj_by_pk(some_pk)`
* working with object in NON reactive states
    * e.g. the above are where we want changes to automatically impact the DOM, but what about
    * in `methods:`
    * in random other methods outside of components where for example we might want to reference
      a store of Nodes and Links to generate a new set objects
        * that method is accessing Proxied objects... but I assume it's not hooking up effects?
    * Let's say you want to make a local copy of an object for an editing page
        * how best do this? JSONCLONE the store based reference?
* Subtle
    * let's say we have 2 different reactive() stores, and in one we have a tree structure
      where the tree nodes can REFERENCE items in the other store... how does this work?

This leads to questions about using `shallowReactive` and/or `Object.freeze` around items to leave
them as vanilla objects. In other words consider:

```js
G.NRstore = {
    obj_by_pk: new Map()
}

G.Rstore = reactive({
    objs: []
})
update_objs = (filter_term)=>{
    // May be smarter way to turn Map into an Array
    G.Rstore.objs = Object.freeze([...G.NRstore.entries()].filter(e=>e.value==filter_term))
}
```

And if we want a "focus" object that is reactive... we just track that ourselves and update it, or
can even just do something like:

```js
G.Rstore = reactive({
    focus_obj: null
})

// trigger this when needed:
G.Rstore.focus_obj = Object.freeze(G.NRstore.obj_by_pk(focus_pk))
```

**A KEY THING HERE** is I get the impression Vue3 DOM updates *might* be just as efficient if all data is frozen vs proxied?
If that is **not the case** to a significant degree, then the above may be too costly performance wise?
