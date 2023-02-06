

const _base62 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const _base62_len = _base62.length;
export function make_base62_id(length=6){
    let result = '';
    for(let i=0; i<length; i++){
        result += _base62.charAt(Math.floor(Math.random()*_base62_len));}
    return result;
}

export function utc_timestamp(){
    const now = new Date();
    return now.toISOString();
}



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

const old_data = {
    collections: [{
        id: "a1",
        name: "Collection 1",
        info: "A useful collection"
    },{
        id: "a2",
        name: "Collection 2",
        info: "A sort of useful collection"
    },{
        id: "a3",
        name: "Collection 3",
        info: "An empty collection"
    }],
    items: [{
        id: "i1",
        collection_id: "a1",
        name: "apple",
        info: "A fruit"
    },{
        id: "i2",
        collection_id: "a1",
        name: "pear",
        info: "Less common"
    },{
        id: "i3",
        collection_id: "a2",
        name: "cow",
        info: "Says moo"
    }]
}

