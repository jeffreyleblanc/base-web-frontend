/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
    <h3 class="font-bold">Collection Page {{collection.name}}</h3>
    <div>{{collection.info}}</div>
</section>`;

export default {
    template,
    data(){ return {} },
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
        }
    }
};
