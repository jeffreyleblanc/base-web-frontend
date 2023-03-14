/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
    <h3 class="font-bold">Main Page</h3>
    <template v-if="collections.length">
        <div v-for="c in collections" :key="c.id">
            <div>{{c.name}}</div>
            <div>{{c.info}}</div>
            <router-link :to="{name:'collection',params:{id:c.id}}">link</router-link>
        </div>
    </template>
    <template v-else>
        No collections
    </template>
</section>`;

export default {
    template,
    data(){ return {} },
    computed: {
        collections(){ return this.$G.store.collections; }
    }
};

