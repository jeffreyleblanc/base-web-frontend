/* Copyright Jeffrey LeBlanc */

import {G} from './global.js'
import DataManager from './DataManager.js'
import {EntryBrowser} from './vue/EntryBrowser.js'
import {EntryAdder} from './vue/EntryAdder.js'
import {POST_JSON} from './tools/fetch.js'

async function async_main(){
    console.log('Running Async Main!');

    // Make the data manager and global store
    G.store = Vue.reactive({
        user: 'alice',
        entries: []
    });
    G.data = new DataManager(G.store);

    // Create the main app
    const template = `
    <div class="flex flex-col">
        <nav class="w-full h-12 px-4 flex flex-row items-center bg-gray-900 text-white">
            <div>Hello <b>{{user}}</b></div>
        </nav>
        <main class="p-4 flex flex-col gap-y-4">
            <EntryAdder/>
            <EntryBrowser :entries="entries"/>
        </main>
    <div>`;
    G.V = Vue.createApp({
        template,
        components: { EntryAdder, EntryBrowser },
        data(){
            return this.$G.store
        },
        methods: {
            // pass
        }
    });

    // Add the global store
    G.V.config.globalProperties.$G = G;

    // Mount and export
    G.V.mount('#mount');

    // Export to window for debugging
    window.G = G;
}

async_main();
