

class DataManager {

    constructor(kinds){

        for(let kind of kinds){
            this[kind] = new ObjectTracker();
        }
    }

    fetch_post(){

    }

    fetch_get(){

    }

    ingest_object(action, obj){
        // pass to the relevant tracker
    }

    async submit_update(action, obj_pk, update){

    }

}


class ObjectTracker {

    constructor(){
        this._strategy = "update"; // "replace"
        this._obj_by_pk = new Map();
        this._data_slices = {};

        this._listeners = new Set();

        if(this.full_slice){
            this._vue_obj = shallowReactive({
                list: [],
                map: {}
            });
        }
    }

    // on an update, optionally parse what has changed so can send to
    // listeners directly
}

class DataSlice {


}

class GenericDataUnion {

}

