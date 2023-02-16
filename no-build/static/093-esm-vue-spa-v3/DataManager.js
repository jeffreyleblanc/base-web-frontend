/* Copyright Jeffrey LeBlanc */

import {reactive} from "vue"
import {fake_fetch} from "./data.js"

export default class DataManager {

    constructor(store_seed={}){
        this.store = reactive({
            ...store_seed,
            collections: [],
            items: []
        });
    }

    fetch_data(){
        fake_fetch("/get/",(data)=>{
            this.store.collections = data.collections;
            this.store.items = data.items;
        });
    }

    has_collection(id){
        for(let c of this.store.collections){
            if(c.id == id){ return true; }
        }
        return false;
    }

    has_item(id){
        for(let c of this.store.items){
            if(c.id == id){ return true; }
        }
        return false;
    }
}

