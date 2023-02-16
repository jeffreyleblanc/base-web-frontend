/* Copyright Jeffrey LeBlanc */

import {reactive,createApp} from "vue"
import {createRouter,createWebHistory,createWebHashHistory} from "vuerouter"

import {G} from "./global.js"
import DataManager from "./DataManager.js"
import MainToolbar from "./MainToolbar.js"
import MainPage from "./MainPage.js"
import StatusPage from "./StatusPage.js"
import CollectionPage from "./CollectionPage.js"
import ItemPage from "./ItemPage.js"
import NotFoundPage from "./NotFoundPage.js"
import NotFoundObject from "./NotFoundObject.js"
import {generate_data} from "./data.js"

function fake_fetch(url, handler){
    if("/get/"==url){
        window.setTimeout(()=>{
            console.log("PING!");
            const data = generate_data();
            handler(data);
        },500);
    }
}


export default function main(){
    console.log("Running Main!");

    // Make the data manager and global store
    G.store = reactive({
        user: "bob",
        collections: [],
        items: []
    });
    G.data = new DataManager(G.store);

    fake_fetch("/get/",(data)=>{
        G.store.collections = data.collections;
        G.store.items = data.items;
    });

    // In theory `base: "/example/91/" could be an option to createRouter
    // but that might be an old option, and doesn't seem to work
    const pathbase = "/"; // "/example/91/";
    const routes = [
        {
            name: "404", path: '/:pathMatch(.*)*', component: NotFoundPage
        },{
            name: "main", path: pathbase, component: MainPage
        },{
            name: "status",
            path: pathbase+"status",
            component: StatusPage
        },{
            name: "collection",
            path: pathbase+"collection/:id",
            component: CollectionPage,
            /* beforeEnter: (to, from)=>{
                console.log("collection beforeEnter");
                return (G.data.has_collection(to.params.id))?
                    true : { name: "notfound", params: { name: "collection", id: to.params.id } };
            }*/
        },{
            name: "item",
            path: pathbase+"item/:id",
            component: ItemPage,
            /*beforeEnter: (to, from)=>{
                console.log("item beforeEnter");
                return (G.data.has_item(to.params.id))?
                    true : { name: "notfound", params: { name: "item", id: to.params.id } };
            }*/
        },{
            name: "notfound",
            path: pathbase+"/notfound/:name/:id",
            component: NotFoundObject
        }
    ];

    const router = createRouter({
        // history: createWebHistory(),
        history: createWebHashHistory(),
        routes,
    });

    router.beforeEach((to,from)=>{
        console.log("beforeEach");
        // console.log("to:",to);
        // console.log("from:",from);

        // console.log("to.name",to.name);
        // console.log("from.name",from.name);
        if("collection" == to.name){
            console.log(">>",to.params);
            if(G.data.has_collection(to.params.id)){

            }else{

            }
            //        true : { name: "notfound", params: { name: "collection", id: to.params.id } };
        }
        else if("item" == to.name){
            console.log(">>",to.params);
            if(G.data.has_item(to.params.id)){

            }else{

            }
            // true : { name: "notfound", params: { name: "item", id: to.params.id } };
        }
    });

    // Create the main app
    const template = `
    <div class="flex flex-col">
        <MainToolbar/>
        <main class="p-4 flex flex-col gap-y-4">
            <router-view></router-view>
        </main>
    <div>`;
    G.V = createApp({
        template,
        components: { MainToolbar, MainPage, StatusPage },
        data(){ return {} },
    });

    // Attach the global store
    G.V.use(G);
    G.V.use(router);

    // Mount and export
    G.V.mount('#mount');

    // Export to window for debugging
    window.G = G;
}


