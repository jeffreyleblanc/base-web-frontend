/* Copyright Jeffrey LeBlanc */

import {reactive,createApp} from "vue"
import {createRouter,createWebHashHistory} from "vuerouter"

import {G} from "./global.js"
import DataManager from "./DataManager.js"
import MainToolbar from "./MainToolbar.js"
import MainPage from "./MainPage.js"
import StatusPage from "./StatusPage.js"


export default function main(){
    console.log("Running Main!");

    // Make the data manager and global store
    G.store = reactive({
        user: "bob",
        collections: [{
            id: "a1",
            name: "Collection 1",
            info: "A useful collection"
        },{
            id: "a2",
            name: "Collection 2",
            info: "A sort of useful collection"
        }],
        items: [{
            id: "i1",
            collection: "a1",
            name: "apple",
            info: "A fruit"
        },{
            id: "i2",
            collection: "a1",
            name: "pear",
            info: "Less common"
        },{
            id: "i3",
            collecton: "a2",
            name: "cow",
            info: "Says moo"
        }]
    });
    G.data = new DataManager(G.store);

    const routes = [
        { path: '/', component: MainPage },
        { path: '/status', component: StatusPage }
    ];

    const router = createRouter({
        // 4. Provide the history implementation to use.
        // We are using the hash history for simplicity here.
        history: createWebHashHistory(),
        routes, // short for `routes: routes`
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
