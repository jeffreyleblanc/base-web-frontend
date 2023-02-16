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
    }

    //-- Server Interface -----------------------------------//

    fetch_data(){
        fake_fetch("/get/",(data)=>{
            this.store.collection_map = data.collections.reduce((obj,e)=>{
                obj[e.id] = e; return obj;
            },{});
            this.store.item_map = data.items.reduce((obj,e)=>{
                obj[e.id] = e; return obj;
            },{});
        });
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

    // May be a better method here. Also check on reactivity
    items_in_collection(cid){
        const lst = [];
        for(let item of Object.values(this.store.item_map)){
            if(item.collection_id==cid){
                lst.push(item); }
        }
        return lst;
    }
}

