/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
    <h3 class="font-bold">Entries</h3>
    <div>Number of entries: {{entries.length}}</div>
    <div
        class="p-4 flex flex-col gap-y-2 bg-gray-300 rounded"
        v-for="e in entries"
        :key="e.id"
    >
        <div class="font-bold">
            {{e.text}}
        </div>
        <div class="text-sm text-gray-700">
            {{e.id}} | {{e.modified}}
        </div>
        <button class="w-fit h-6 bg-red-600 text-sm text-white px-2 rounded" :data-id="e.id" @click="on_delete($event)">
            delete
        </button>
    </div>
</section>`;

export const EntryBrowser = {
    template,
    name: 'entry-browser',
    props: {
        entries: Array
    },
    data(){ return {
        ask_before_delete: false
    } },
    methods: {
        on_delete(event){
            const entry_id = event.target.dataset['id']
            if( this.ask_before_delete && !window.confirm('Confirm delete?')){
                return; }
            this.$G.data.delete(entry_id);
        }
    }
};
