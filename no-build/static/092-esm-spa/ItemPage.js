/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
    <h3 class="font-bold">Item Page</h3>
    <router-link
        class="text-blue-600"
        :to="{name:'collection',params:{id:item.collection_id}}"
    >
        parent
    </router-link>
    <h3>{{item.name}}</h3>
    <div>{{item.info}}</div>
</section>`;

export default {
    template,
    data(){ return {} },
    computed: {
        item_id(){
            return this.$route.params.id
        },
        item(){
            for(let item of this.$G.store.items){
                if(item.id == this.item_id){
                    return item;
                }
            }
            return null;
        }
    }
};
