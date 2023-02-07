/* Copyright Jeffrey LeBlanc */

export default class DataManager {

    constructor(store){
        this._store_ref = store;
    }

    has_collection(id){
        for(let c of this._store_ref.collections){
            if(c.id == id){ return true; }
        }
        return false;
    }
}

