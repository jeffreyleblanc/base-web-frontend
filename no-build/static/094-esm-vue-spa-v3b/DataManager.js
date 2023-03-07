/* Copyright Jeffrey LeBlanc */

import {reactive} from "vue"
import {fake_fetch} from "./data.js"

export default class DataManager {

    constructor(store_seed={}){
        this.store = reactive({
            ...store_seed,
            collection_map: {},
            item_map: {}
        });

        this._curr_interval_id = null;
        this._interval_ms = 2500;
    }

    //-- Server Interface -----------------------------------//

        fetch_data(){
            fake_fetch("/get/",(data)=>{
                this.reload_data(data);
            });
        }

        reload_data(data){
            this.store.collection_map = data.collections.reduce((obj,e)=>{
                obj[e.id] = e; return obj;
            },{});
            this.store.item_map = data.items.reduce((obj,e)=>{
                obj[e.id] = e; return obj;
            },{});
        }

    //-- Update methods ---------------------------------------//

        set_cycle({name="",id=null}={}){
            if("collections"==name){
                this._set_update_method(()=>{
                    console.log("update",name,id);
                });
            }
            else if("collection"==name){
                this._set_update_method(()=>{
                    console.log("update",name,id);
                });
            }
            else if("item"==name){
                this._set_update_method(()=>{
                    console.log("update",name,id);
                });
            }
        }

        _set_update_method(meth=null){
            if(this._curr_interval_id!=null){
                window.clearInterval(this._curr_interval_id); }

            if(meth!=null){
                this._curr_interval_id = window.setInterval(meth,this._interval_ms);
            }else{
                this._curr_interval_id = null;
            }
        }

    //-- Collection Methods ---------------------------------//

        has_collection(id){
            return this.store.collection_map[id]!==undefined;
        }

        // We need to review the reactivity implications of this:
        collection_list(){
            return Object.values(this.store.collection_map);
        }

    //-- Item Methods ---------------------------------------//

        has_item(id){
            return this.store.item_map[id]!==undefined;
        }

        items_in_collection(cid){
            // Method 1: Using a chained method
            return Object.values(this.store.item_map).filter(e=>e.collection_id==cid);

            // Method 2: Iterating over the values
            // > likely less efficient than above,
            // > esp since Object.values is not a generator, but returns an actual array.
            /*
            const lst = [];
            for(let item of Object.values(this.store.item_map)){
                if(item.collection_id==cid){
                    lst.push(item); }
            }
            return lst;
            */
    }
}

