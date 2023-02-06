/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
    <router-link :to="{name:'collection',params:{id:item.collection_id}}">parent</router-link>
    <h3 class="font-bold">Item Page {{item.name}}</h3>
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
