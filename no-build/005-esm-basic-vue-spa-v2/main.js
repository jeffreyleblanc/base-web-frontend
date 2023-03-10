/* Copyright Jeffrey LeBlanc */

import {reactive,createApp} from "vue"

import {POST_JSON} from "./tools/fetch.js"
import {G} from "./global.js"
import DataManager from "./DataManager.js"
import EntryBrowser from "./vue/EntryBrowser.js"
import MainToolbar from "./vue/MainToolbar.js"
import EntryAdder from "./vue/EntryAdder.js"

export default function main(){
    console.log("Running Main!");

    // Make the data manager and global store
    G.store = reactive({
        user: "alice",
        entries: []
    });
    G.data = new DataManager(G.store);

    // Create the main app
    const template = `
    <div class="flex flex-col">
        <MainToolbar/>
        <main class="p-4 flex flex-col gap-y-4">
            <EntryAdder/>
            <EntryBrowser/>
        </main>
    <div>`;
    G.V = createApp({
        template,
        components: { MainToolbar, EntryAdder, EntryBrowser },
        data(){ return {} },
    });

    // Attach the global store
    G.V.use(G);

    // Mount and export
    G.V.mount('#mount');

    // Export to window for debugging
    window.G = G;
}
