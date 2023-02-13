/* Copyright 2022 Jeffrey LeBlanc */

import { createApp, reactive, shallowReactive, watchEffect, watch } from 'vue'

export default function main(){


    const robj = reactive({
        a: 1,
        b: 2,
        c: [1,2,3,4]
    });
    const srobj = shallowReactive({
        a: 3,
        b: 4,
        c: [ 1,2,3,4]
    });

    watchEffect(()=>{
        console.log("robj.a changed to:",robj.a);
    });
    watchEffect(()=>{
        console.log("robj changed to:",robj);
    });
    watch(
        ()=>robj,
        (a,b)=>{ console.log("jjj",a,b) },
        { deep: true }
    );

    window.setTimeout(()=>{
        console.log("=== trigger update ===");
        robj.a = "UPDATED!"
    },1000);

    const app = createApp({
        template: `
        <main>
            <p class="p-4 text-sky-700">{{message}}</p>
            <pre>{{robj_json}}</pre>
            <pre>{{srobj_json}}</pre>
        </main>`,
        data(){ return {
            message: 'Hello World!'
        }},
        computed:{
            robj(){ return robj; },
            robj_json(){ return JSON.stringify(this.robj); },
            srobj(){ return srobj; },
            srobj_json(){ return JSON.stringify(this.srobj); }
        }
    });
    app.mount('#app');

    // Export stuff
    window.G = {
        app,
        robj,
        srobj
    };
}
