
import {make_base62_id,utc_timestamp} from "./tools.js"

export function generate_data(){

    const collections = [];
    for(let i=0; i<10; i++){
        collections.push({
            id: make_base62_id(),
            name: `Collection ${i}`,
            info: `${i}^2 is ${i*i}`
        });
    }

    const items = [];
    let count = 0;
    for(let collection of collections){
        const cid = collection.id;
        for(let i=0; i<5; i++){
            items.push({
                id: make_base62_id(),
                collection_id: cid,
                name: `Something random: ${make_base62_id()}`,
                info: `${count}^2 is ${count*count}`
            });
            count += 1;
        }
    }

    return { collections, items }
}

export function fake_fetch(url, handler){
    if("/get/"==url){
        window.setTimeout(()=>{
            console.log("PING!");
            const data = generate_data();
            handler(data);
        },500);
    }
}

