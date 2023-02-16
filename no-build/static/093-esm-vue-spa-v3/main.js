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
import {fake_fetch,generate_data} from "./data.js"


export default function main(){
    console.log("Running Main!");

    // Make the data manager and global store
    G.store = reactive({
        user: "bob",
        collections: [],
        items: []
    });
    G.data = new DataManager(G.store);


    // Set up the routes
    const routes = [
        {
            name: "main", path: "/", component: MainPage
        },{
            name: "status",
            path: "/status",
            component: StatusPage
        },{
            name: "collection",
            path: "/collection/:id",
            component: CollectionPage,
            props: true
        },{
            name: "item",
            path: "/item/:id",
            component: ItemPage,
            props: true
        }
    ];

    // Set up our router
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    });
    router.beforeEach((to,from)=>{
        console.log("beforeEach");
        if("collection" == to.name){
            console.log(">>",to.params);
            if(G.data.has_collection(to.params.id)){

            }else{

            }
        }
        else if("item" == to.name){
            console.log(">>",to.params);
            if(G.data.has_item(to.params.id)){

            }else{

            }
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

    // Kick of the system
    fake_fetch("/get/",(data)=>{
        G.store.collections = data.collections;
        G.store.items = data.items;
    });
}


