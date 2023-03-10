
/*
In this document I'm going to sketch out ideas related to data management.
*/

// Version 1 ///////////////////////////////////////////////////////////

/*
This first version just shows a simple set of methods for tracking objects
*/

class ObjectTracker {

    constructor(kind, pk){
        this.kind = kind;
        this.pk = pk;

        this._obj_by_pk = new Map();
    }

    get(obj_pk){
        return this._obj_by_pk.get(obj_pk)||null;
    }

    has(obj_pk){
        return this._obj_by_pk.has(obj_pk);
    }

    upsert(obj){
        this._obj_by_pk.set(obj[this.pk] = obj;
    }

    delete(obj_pk){
        this._obj_by_pk.delete(obj_pk);
    }

    *yield_all(){
        for(let obj of this._obj_by_pk.values()){
            yield obj;
        }
    }
}


// Version 2 ///////////////////////////////////////////////////////////

/*
This version shows tracking with a reactive vue component as well.
Note this version makes the entirety of the vue objects reactive.
*/

import {reactive} from "vue"
import {deepCloneObject} from "~/core/tools"

class ObjectTracker {

    constructor(kind, pk){
        this.kind = kind;
        this.pk = pk;

        this._obj_by_pk = new Map();

        this._vue_obj = reactive({
            list: [],
            map: {}
        });
    }

    get(obj_pk){
        return this._obj_by_pk.get(obj_pk)||null;
    }

    vget(obj_pk){
        return this._vue_obj.map[obj_pk];

    has(obj_pk){
        return this._obj_by_pk.has(obj_pk);
    }

    upsert(obj){
        const pk = obj[this.pk];
        const has = this._obj_by_pk.has(pk);

        this._obj_by_pk.set(pk,obj);

        if(has){
            const ref = this._vue_obj.map[pk];
            for(let [k,v] of Object.entries(obj)){
                ref[k] = v;
            }
            // because the list shares the same reference, it will be updated as well
        }else{
            const clone = deepCloneObject(obj);
            this._vue_obj.map[pk] = clone;
            this._vue_obj.list.push(clone);
        }
    }

    delete(obj_pk){
        const had = this._obj_by_pk.delete(obj_pk);
        if(had){
            delete this._vue_obj.map[obj_pk];
            const idx = this._vue_obj.list.findIndex(e=>e[this.pk]==obj_pk);
            if(idx > -1){
                this._vue_obj.list.splice(idx,1); }
        }
    }

    *yield_all(){
        for(let obj of this._obj_by_pk.values()){
            yield obj;
        }
    }
}



// Version 3 ///////////////////////////////////////////////////////////

/*
This version shows tracking with a reactive vue component as well.
Note this version makes the entirety of the vue objects reactive.
THIS USES SHALLOW REACTIVE
*/

import {shallowReactive} from "vue"
import {deepCloneObject} from "~/core/tools"

class ObjectTracker {

    constructor(kind, pk){
        this.kind = kind;
        this.pk = pk;

        this._obj_by_pk = new Map();
        this._obj_list = [];

        this._vue_list = shallowReactive({
            list: []
        });
        this._vue_map = shallowReactive({});

        this._listeners = [];
    }

    get(obj_pk){
        return this._obj_by_pk.get(obj_pk)||null;
    }

    has(obj_pk){
        return this._obj_by_pk.has(obj_pk);
    }

    // need a bulk set

    upsert(obj){
        const pk = obj[this.pk];
        const curr = this._obj_by_pk.get(pk);
        const has = ( curr!=null );

        // Update vanilla using the direct set method
        this._obj_by_pk.set(pk,obj);
        if(!has){
            this._obj_list.push(obj);
            this._listeners.forEach(l=>l.on_add(this.kind,obj));
        }else{
            if(this._listeners.size()>0){
                const diff = {};
                for(let [k,v] of Object.entries(curr){
                    if(obj[k]!=v){
                        diff[k] = obj[k];
                    }
                }
                this._listener.forEach(l=>l.on_update(this.kind,diff,obj);
            }
        }

        // Update vue system
        // Do we even need to duplicate the list?
        // Can we "reassign it by removing and then adding back?
        // But the issue is it is a different list then...
        // Maybe there is a manual trigger we can use?
        // something like `triggerRef`, if we use a ref instead?
        this._vue_list.list = this._obj_list.slice();
        this._vue_map[pk] = obj
    }

    delete(obj_pk){
        const had = this._obj_by_pk.delete(obj_pk);
        if(had){
            const idx = this._obj_list.findIndex(e=>e[this.pk]==obj_pk);
            if(idx > -1){
                this._obj_list.splice(idx,1); }
            this._listener.forEach(l=>l.on_delete(this.kind,pk);
        }

        if(had){
            this._vue_list.list = this._obj_list.slice();
            delete this._vue_map[obj_pk];
        }
    }

    *yield_all(){
        for(let obj of this._obj_by_pk.values()){
            yield obj;
        }
    }
}

// Version 3 /////////////////////////////////////////////////////////////////////////////

/*
In this version we introduce the idea of data views.
In this case we are still using "deep" reactivity on the objects
Some limitations here:
* We aren't efficiently sharing the same vue objects between our main
  vue stores and the views
* We might ask the question, if we are using these views, why even have
  the general vue store?
* Note the views are purely about making reactive vue objects
* We need to add pagination and offset to our views
*/

import {reactive} from "vue"
import {deepCloneObject} from "~/core/tools"


function remove_from_list(list, pk_attr, obj_pk){
    const idx = list.findIndex(e=>e[pk_attr]==obj_pk);
    if(idx > -1){ list.splice(idx,1); }
}


class ObjectView {

    constructor({
        pk = undefined,
        filter_meth = undefined,
        sort_meth = undefined,
    }={}){
        this.filter_meth = filter_meth;
        this.sort_meth = sort_meth;

        this.pk = pk;
        this.pk_list = new Set();
        this.vue_obj = reactive({
            map: {},
            list: []
        });
    }

    clear(){
        this.pk_list.clear();

    }

    update(action, obj_pk, obj){
        if(action=="delete"){
            if(this.pk_list.has(obj_pk){
                this.pk_list.delete(obj_pk);
                delete this.vue_obj.map[obj_pk];
                remove_from_list(this.vue_obj.list,this.pk,obj_pk);
            }
        }else{
            let resort = false;
            /*
            Note here this section the issue of reusing objects
            and the generation of deeply reactive objects is clear.

            Where are getting the `obj` from?
            Note that if we just add it to ...
            well now in vue3 a proxy is used, so does anything happen to the
            original plain object? I think in Vue2 it would get getters and setters
            added to it, but that aside, in vue3 we may just generate a proxied copy?
            or maybe the proxy points to it?
            */
            if(action=="update"){
                if(this.pk_list.has(obj_pk){
                    const ref = this.vue_obj.map[obj_pk];
                    for(let [k,v] of Object.entries(obj){
                        ref[k] = v;
                    }
                    resort = true; // could be made smarter
                }else{
                    action = "insert";
                }
            }
            if(action=="insert" && this.filter_meth(obj)){
                const clone = deepCloneObject(obj);
                this.pk_list.add(obj_pk);
                this.vue_obj.map[obj_pk] = clone
                this.vue_obj.list.push(clone);
                resort = true;
            }
            if(resort){
                this.vue_obj.list = this.vue_obj.list.sort(this.sort_meth);
            }
        }
    }
}


class ObjectView2 {

    constructor({
        pk = undefined,
        filter_meth = undefined,
        sort_meth = undefined,
    }={}){
        this.filter_meth = filter_meth;
        this.sort_meth = sort_meth;

        this.pk = pk;
        this.pk_list = new Set();

        // this could be a shallowRef instead
        this.vue_list = shallowReactive({
            list: []
        });
        this.vue_map = shallowReactive({});
    }

    clear(){
        this.vue_list.list = [];
        // not super efficient...
        // is there a pattern or a manual vue method that can let us
        // replace this object with a new one in such a way that all
        // subscribers are transparently updated and we don't break
        // the reactivity connections/bindings?
        // this is where using Object.freeze could be better, because
        // we can fully replace the object...
        // If we want to replace/update a frozen object efficiently I wonder if
        // Object.freeze({ new_key: value, ...frozen_obj }) or
        // Object.freeze(Object.assign({new_key:value},frozen_obj));
        // Could be efficient?
        // The bigger truth is we probably just want to track a couple objects
        // directly, and we can maintain a much smaller set of mappings
        // that depend on what components are specifically targeting
        // possibly using a components onCreate or onUpdate methods are where
        // we can signal a global store that we want to start directly tracking
        // (or stop tracking) a specific object
        for(let k of this.pk_list){
            delete this.vue_map[k]; }
        this.pk_list.clear();
    }

    update(action, obj_pk, obj){
        if(action=="delete"){
            if(this.pk_list.has(obj_pk){
                this.pk_list.delete(obj_pk);
                delete this.vue_map[obj_pk];
                // eh... not quite right:
                // remove_from_list(this.vue_obj.list,this.pk,obj_pk);
            }
        }else{
            let resort = false;
            /*
            Note here this section the issue of reusing objects
            and the generation of deeply reactive objects is clear.

            Where are getting the `obj` from?
            Note that if we just add it to ...
            well now in vue3 a proxy is used, so does anything happen to the
            original plain object? I think in Vue2 it would get getters and setters
            added to it, but that aside, in vue3 we may just generate a proxied copy?
            or maybe the proxy points to it?
            */
            if(action=="update"){
                if(this.pk_list.has(obj_pk){
                    const ref = this.vue_obj.map[obj_pk];
                    for(let [k,v] of Object.entries(obj){
                        ref[k] = v;
                    }
                    resort = true; // could be made smarter
                }else{
                    action = "insert";
                }
            }
            if(action=="insert" && this.filter_meth(obj)){
                const clone = deepCloneObject(obj);
                this.pk_list.add(obj_pk);
                this.vue_obj.map[obj_pk] = clone
                this.vue_obj.list.push(clone);
                resort = true;
            }
            if(resort){
                this.vue_obj.list = this.vue_obj.list.sort(this.sort_meth);
            }
        }
    }
}


class ObjectTracker {

    constructor(kind, pk){
        this.kind = kind;
        this.pk = pk;

        this._obj_by_pk = new Map();

        // we should a tracking filter...
        this._track_filter = null;

        this._vue_obj = reactive({
            list: [],
            map: {}
        });

        this.data_views = {};
    }

    // basically clear all data and state
    clear_all(){
        this._obj_by_pk.clear();
        this._vue_obj.list = [];
        this._vue_obj.map = {};
        for(let view in Object.values(this.data_views)){
            view.clear();
        }
    }

    //-- Data Views ----------------------------------------------------------//

    add_data_view(name, filter_meth, sort_meth){
        const view = new DataView({filter_meth,sort_meth});
        this.data_views[name] = view;

        // Because we might add the data view at any time, we need to trigger running the view
        // Note that this could be expensive (more so than triggering as data comes in)
        // So we could do things like batch these updates, though that might be overly clever
        // for a generic system, and be the purview of special cases
        for(let obj of this._obj_by_pk.values()){
            this._update_data_view("insert",view,obj.pk,obj);
        }
    }

    _update_data_views(action, obj_pk, obj){
        this.data_view.forEach(v=>this._update_data_view(v,action,obj_pk,obj));
    }

    //-- Core Methods --------------------------------------------------------//

    get(obj_pk){
        return this._obj_by_pk.get(obj_pk)||null;
    }

    vget(obj_pk){
        return this._vue_obj.map[obj_pk];

    has(obj_pk){
        return this._obj_by_pk.has(obj_pk);
    }

    upsert(obj){
        if(this._track_filter!=null && !this._track_filter(obj){
            return; }

        const pk = obj[this.pk];
        const has = this._obj_by_pk.has(pk);
        this._obj_by_pk.set(pk,obj);

        if(has){
            const ref = this._vue_obj.map[pk];
            for(let [k,v] of Object.entries(obj)){
                ref[k] = v;
            }
            // because the list shares the same reference, it will be updated as well

            this._update_data_views("update",obj.pk,obj);
        }else{
            const clone = deepCloneObject(obj);
            this._vue_obj.map[pk] = clone;
            this._vue_obj.list.push(clone);
            this._update_data_views("insert",obj.pk,obj);
        }
    }

    delete(obj_pk){
        const had = this._obj_by_pk.delete(obj_pk);
        if(had){
            delete this._vue_obj.map[obj_pk];
            remove_from_list(this._vue_obj.list,this.pk,obj_pk);
            this._update_data_view("delete",obj.pk);
        }
    }

    *yield_all(){
        for(let obj of this._obj_by_pk.values()){
            yield obj;
        }
    }
}

// Interlude: Consuming this API ///////////////////////////////////////////////

/*
Here we start to sketch from the other direction: What does it look like to consume this?

*/


function example(){

    const tracker = new DataTracker("Fruit","uuid");
    tracker.add_data_view("small ones",(fruit)=>{
        return fruit.weight < 1.0;
    },(a,b)=>{
        return a.weight-b.weight;
    });
    // the above raises the question though, we might want to develop multiple
    // ways of sorting the data, such as when we have a table of data.
    // in this case the filtering might be costly so each data view has a single
    // filter method, but we could be more flexible with the sorting method, in the
    // same way we want to add pagination and offset

    // What about the case where we want to track just a **single** object
    // This happens frequently.
    // In this case we probably want another method, say a "data-focus"
    // We also have to make sure the machinary works for this being null
}


