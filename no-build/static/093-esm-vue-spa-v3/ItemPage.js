/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
<template v-if="item!=null">
    <h3 class="font-bold">Item Page</h3>
    <router-link
        class="text-blue-600"
        :to="{name:'collection',params:{id:item.collection_id}}"
    >
        parent
    </router-link>
    <h3>{{item.name}}</h3>
    <div>{{item.info}}</div>
</template>
<template v-else>
    <div>This item does not exist</div>
</template>
</section>`;

export default {
    template,
    data(){ return {} },
    props: [ "id" ],
    computed: {
        item(){
            return this.$G.store.item_map[this.id]||null;
        }
    }
};
