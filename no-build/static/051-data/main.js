/* Copyright 2022 Jeffrey LeBlanc */

import { createApp, reactive, shallowReactive, watchEffect, watch } from 'vue'

export default function main(){

    // Other ideas

    const TT = {};

    TT.raw = [{i:1},{i:2},{i:3}];
    // won't work TT.freeze = Object.freeze(TT.raw);
    TT.freeze = Object.freeze(TT.raw.slice())


    TT.raw.push("L")
    // 4
    TT.freeze
    // (3) [{…}, {…}, {…}]
    TT.freeze[0]
    // {i: 1}
    TT.freeze[0].j = 45
    // 45
    TT.freeze[0]
    // {i: 1, j: 45}
    TT.raw[0]
    // {i: 1, j: 45}
    // will trigger an error: G.TT.freeze.push("yak")


    // https://vuejs.org/api/reactivity-core.html
    // https://vuejs.org/api/reactivity-utilities.html
    // https://vuejs.org/api/reactivity-advanced.html
    // Questions:
    // * any issues using watchers outside of a component
    //   ( one thing is we probably want to manually stop them )

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
        (a,b,c,d)=>{ console.log("jjj",a,b,c,d) },
        { deep: true }
    );
    watch(
        robj,
        (a,b,c,d)=>{ console.log("mmm",a,b,c,d) },
        { deep: true }
    );
    window.setTimeout(()=>{
        console.log("=== trigger update 3 ===");
        robj.a = "UPDATED!"
    },1000);

    window.setTimeout(()=>{
        console.log("=== trigger update 2  ===");
        robj.c.push("yak");
    },2000);

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
        srobj,
        TT
    };
}
