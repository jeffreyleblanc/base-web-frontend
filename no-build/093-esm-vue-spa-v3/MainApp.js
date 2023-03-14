
import MainToolbar from "./MainToolbar.js"

const template = `
<div class="flex flex-col">
    <MainToolbar/>
    <main class="p-4 flex flex-col gap-y-4">
        <router-view></router-view>
    </main>
<div>`;

export default {
    template,
    components: { MainToolbar },
    data(){ return {} },
}

