
const template = `
<nav class="w-full h-12 px-4 flex flex-row items-center gap-x-4 bg-gray-900 text-white">
    <div>Example App</div>
    <div>Hello <b>{{user}}</b></div>
    <router-link :to="{name:'main'}">home</router-link>
    <router-link :to="{name:'status'}">status</router-link>
</nav>`;

export default {
    template,
    data(){ return {} },
    computed: {
        user(){ return this.$G.store.user; }
    }
}

