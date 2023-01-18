/* Copyright Jeffrey LeBlanc */

const template = `
<div class="p-4 flex flex-col gap-y-2 bg-gray-300 rounded">
    <div class="font-bold">
        {{entry.text}}
    </div>
    <div class="text-sm text-gray-700">
        {{entry.id}} | {{entry.modified}}
    </div>
    <button class="w-fit h-6 bg-red-600 text-sm text-white px-2 rounded" :data-id="entry.id" @click="on_delete($event)">
        delete
    </button>
</div>`;

export default {
    template,
    data(){ return {
        ask_before_delete: false
    } },
    props: {
        entry: Object
    },
    methods: {
        on_delete(event){
            const entry_id = event.target.dataset['id']
            if( this.ask_before_delete && !window.confirm('Confirm delete?')){
                return; }
            this.$G.data.delete(entry_id);
        }
    }
};
