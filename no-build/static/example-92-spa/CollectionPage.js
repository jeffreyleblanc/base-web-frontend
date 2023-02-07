/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
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
</section>`;

export default {
    template,
    data(){ return {} },

    async beforeRouteUpdate(to, from) {
        // react to route changes...
        // this.userData = await fetchUser(to.params.id)
        console.log("route update:",to,from);
    },
    computed: {
        cid(){
            return this.$route.params.id
        },
        collection(){
            let item = null;
            for(let c of this.$G.store.collections){
                if(c.id == this.cid){
                    return c;
                }
            }
            return null;
        },
        items(){
            return this.$G.store.items.filter(i=>i.collection_id==this.cid);
        }
    }
};
