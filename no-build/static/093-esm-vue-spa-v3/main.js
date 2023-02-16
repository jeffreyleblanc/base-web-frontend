/* Copyright Jeffrey LeBlanc */

import {reactive,createApp} from "vue"
import {createRouter,createWebHistory,createWebHashHistory} from "vuerouter"

import {G} from "./global.js"
import DataManager from "./DataManager.js"
import MainApp from "./MainApp.js"
import MainPage from "./MainPage.js"
import StatusPage from "./StatusPage.js"
import CollectionPage from "./CollectionPage.js"
import ItemPage from "./ItemPage.js"


export default function main(){
    console.log("Running Main!");

    // Make the data manager and global store
    G.data = new DataManager({
        user: "bill"
    });
    G.store = G.data.store;

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
                console.log("has collection");
            }else{
                console.log("no collection");
            }
        }
        else if("item" == to.name){
            console.log(">>",to.params);
            if(G.data.has_item(to.params.id)){
                console.log("has item");
            }else{
                console.log("no item");
            }
        }
    });

    // Create the main app
    G.V = createApp(MainApp);
    G.V.use(G);
    G.V.use(router);

    // Mount and export
    G.V.mount('#mount');

    // Export to window for debugging
    window.G = G;

    // Kick of the system
    G.data.fetch_data();
}


