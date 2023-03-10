/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
<template v-if="collection!=null">
    <h3 class="font-bold">Collection Page {{collection.name}}</h3>
    <div>{{collection.info}}</div>
    <template v-if="items.length>0">
        <div v-for="item in items" :key="item.id">
            <div>{{item.id}} | {{item.info}}</div>
            <router-link class="text-blue-600" :to="{name:'item',params:{id:item.id}}">link</router-link>
        </div>
    </template>
    <template v-else>
        <div>No items</div>
    </template>
</template>
<template v-else>
    <div>This collection does not exist</div>
</template>
</section>`;

export default {
    template,
    data(){ return {} },
    props: [ "id" ],
    computed: {
        collection(){
            return this.$G.store.collection_map[this.id]||null;
        },
        items(){
            return this.$G.data.items_in_collection(this.id);
        }
    }
};
