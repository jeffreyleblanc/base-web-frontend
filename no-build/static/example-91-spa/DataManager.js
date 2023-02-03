/* Copyright Jeffrey LeBlanc */

import {make_base62_id,utc_timestamp} from './tools/common.js'

export default class DataManager {

    constructor(store){
        this._store_ref = store;
    }

}

