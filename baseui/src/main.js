/* Copyright Jeffrey LeBlanc */

import './css/index.css'
import '~/libcss/static.css'
import {createApp,reactive} from 'vue'
import {G} from '~/global.js'
import {DataManager} from '~/DataManager.js'
import MainApp from '~/vue/MainApp.vue'

import SVGIconStore from './baseui/SVGIconStore.js'

import SvgIcon from '~/baseui/vue/SvgIcon.vue';
import ChevronDown from '~/baseui/vue/ChevronDown.vue';
import BaseMenu from '~/baseui/vue/menu/BaseMenu.vue';
import BaseDropPanel from '~/baseui/vue/menu/BaseDropPanel.vue';


async function async_main(){
    console.log('Running Async Main!');

    // Make the data manager and global store
    G.store = reactive({
        ui: MainApp.$init_data(),
        user: 'hank',
        entries: []
    });
    G.data = new DataManager(G.store);

    G.icons = new SVGIconStore('/media/icons/');

    // // Make, assign, and load the data manager
    // G.manager = new DataManager();
    // G.store = G.manager.store;
    // await G.manager.load_file_node({rel_path:''});

    // Create the main app
    const app = createApp(MainApp);
    app.config.globalProperties.$G = G;
    app.component( 'SvgIcon',SvgIcon)
        .component('chevron-down',ChevronDown)
        .component('base-menu',BaseMenu)
        .component('base-drop-panel',BaseDropPanel);

    // Mount and export
    app.mount('#mount');

    window.setTimeout(()=>{
        G.data.make_new('A','a','a');
        G.data.make_new('B','b','b');
        G.data.make_new('C','c','c');
    },10);

    // Export to window for debugging
    window.G = G;
    G.V = app;

    console.log('window.DATA:',window.DATA);
}

async_main();
