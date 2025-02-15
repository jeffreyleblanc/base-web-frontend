

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


