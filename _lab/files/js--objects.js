/*! Copyright (c) 2022-present Jeffrey LeBlanc. */

function prettyJSON(obj){
    return JSON.stringify(obj,undefined,'    ');
}

function main(){

    if(true){
        console.log('# VERSION 1: CREATES A NEW OBJECT')
        const base_obj = {
            uid: null,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
            radius: 0
        }

        const obj1 = {
            x: 23, y: 14
        }

        const obj1_ = Object.assign({},base_obj,obj1);

        console.log('base',prettyJSON(base_obj))
        console.log('obj1',prettyJSON(obj1))
        console.log('obj1_',prettyJSON(obj1_))
    }
    if(true){
        console.log('# Object properties')

        const obj = {
            a: 1, b: 'things', c: false, d: null,
            x: undefined
        }

        for(let k of Object.keys(obj)){
            console.log(k)
        }

        for(let k of ['a','b','c','d','x','z']){
            console.log(
                k,
                obj.hasOwnProperty(k)?'HAS ':'!has',
                'undefined_checks:',
                '==',obj[k]==undefined,
                '===',obj[k]===undefined
            );
        }

    }if(true){
        console.log('# VERSION 2: UPDATE THE OBJECT')
        const base_obj = {
            uid: null,
            x: 0,
            y: 0,
            w: 100,
            h: 100,
            radius: 0,
            stroke: null
        }

        const obj1 = {
            x: 23, y: 14, w:undefined, h:undefined
        }

        const update1 = {
            x: 999, radius: 4, ignore:'YAKS', stroke: {
                width: 3, color: 'pink'
            }
        }

        // should we call these `shallow_patch_obj()` ?

        function patch_obj(curr, patch){
            // Any shallow key:value in patch missing|undefined in curr are set
            // Deep copies if the value is an 'object'
            for(let k of Object.keys(patch)){
                if(!curr.hasOwnProperty(k)||curr[k]===undefined){
                    const v = patch[k];
                    if(typeof v !== 'object'){
                        curr[k] = v;
                    }else{
                        curr[k] = JSON.parse(JSON.stringify(v));
                    }
                }
            }
        }

        function update_obj(curr, update){
            // Any shallow keys in **both** get value from update
            // Deep copies if the value is an 'object'
            for(let k of Object.keys(curr)){
                if(update.hasOwnProperty(k)){
                    const v = update[k];
                    if(typeof v !== 'object'){
                        curr[k] = v;
                    }else{
                        curr[k] = JSON.parse(JSON.stringify(v));
                    }
                }
            }
        }

        // Should we have an update that will also ADD missing keys?
        // Honestly, patch_obj then update_obj does that
        // Maybe a single method can be more efficient...

        patch_obj(obj1,base_obj)
        console.log('base',prettyJSON(base_obj))
        console.log('obj1',prettyJSON(obj1))
        update_obj(obj1,update1);
        console.log('obj1',prettyJSON(obj1))
    }
    if(true){
        console.warn('Look at spread operator as another option')
    }
    if(true){
        console.warn('What does hasOwnProperty and [$key] do on a class instance?')
    }

}
main();
