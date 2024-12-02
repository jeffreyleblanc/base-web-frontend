import {createApp,reactive} from "vue"
import MainApp from "./MainApp.vue"


function main(){
    console.log("start test system");

    const G = {};

    // Make our global stores
    G.store = reactive({
        displayed_art_data: []
    });
    G.uistate = reactive({
        can_load_more: true
    })

    // Setup Vue
    G.app = createApp(MainApp);
    G.app.mount("#vue-mount-point");

    window.$G = G;
}

main();
