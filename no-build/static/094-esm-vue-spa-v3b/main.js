/* Copyright Jeffrey LeBlanc */

import {createApp} from "vue"
import {createRouter,createWebHistory,createWebHashHistory} from "vuerouter"

import {G} from "./global.js"
import DataManager from "./DataManager.js"
import MainApp from "./MainApp.js"
import CollectionsListPage from "./CollectionsListPage.js"
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
    const routes = [{
        name: "main",
        path: "/",
        component: CollectionsListPage
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
    }];

    // Set up our router
    const router = createRouter({
        history: createWebHashHistory(),
        routes,
    });
    router.beforeEach((to,from)=>{
        let name = to.name;
        if("main"==name){ name = "collections"; }
        const id = to?.params?.id;
        G.data.set_cycle({name,id});
    });

    // Create the main app
    G.app = createApp(MainApp);
    G.app.use(G);
    G.app.use(router);

    // Mount and export
    G.app.mount('#mount');

    // Export to window for debugging
    window.G = G;

    // Kick of the system
    G.data.fetch_data();
}


