https://vuejs.org/guide/extras/reactivity-in-depth.html

## Conceptual Overview

dependencies
    A1 = 1
    A2 = 2
effect
    update(){ A3 = A1 + A2 }
    => A3 updates

to achieve this we need something that *watches* the *dependencies*
and runs the *effect* when they change

to make this more automated, we want to track what "reads"/depends
on A1, A2, so we can automatically wire up triggering the *effect*
when they change.


## Javascript Implementation

Vue2 => used custom getter/setters to track
Vue3 => uses [Proxies](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy)


## The Vue3 Setup: A Sketch

Here are the raw ingredients the vue reactive part talks about. But to be honest how some of this
actually hooks up is a little glossed over.

```js
function reactive(obj){
    // It seems Vue *might* clone the obj? as the back references seem broken
    return new Proxy(obj,{
        get(target, key){
            track(target, key)
            return target[key]
        },
        set(target, key, value) {
            target[key] = value
            trigger(target, key)
        }
    })
}

const SUBSCRIBERS = new WeakMap();
function getSubscribersForProperty(target, key){
    const lst = SUBSCRIBERS.get(target); // NOTE: need to use key as well?
    if(lst==undefined){
        const lst = new Set();
        SUBSCRIBERS.set(target,lst);
    }
    return lst;
}

// This will be set right before an effect is about
// to be run. We'll deal with this later.
let activeEffect

function track(target, key){
    if(activeEffect){
        const effects = getSubscribersForProperty(target, key)
        effects.add(activeEffect)
    }
}


function trigger(target, key){
    const effects = getSubscribersForProperty(target, key)
    effects.forEach((effect) => effect())
}


function whenDepsChange(update){
    const effect = () => {
        activeEffect = effect
        update()
        activeEffect = null
    }
    effect()
}

```

