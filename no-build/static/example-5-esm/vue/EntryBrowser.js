/* Copyright Jeffrey LeBlanc */

import EntryBrowserEntry from "./EntryBrowserEntry.js"

const template = `
<section class="flex flex-col gap-y-4">
    <h3 class="font-bold">Entries</h3>
    <div>Number of entries: {{entries.length}}</div>
    <EntryBrowserEntry
        v-for="e in entries"
        :key="e.id"
        :entry="e"
    />
</section>`;

export default {
    template,
    components: { EntryBrowserEntry },
    data(){ return {
        ask_before_delete: false
    } },
    computed: {
        entries(){ return this.$G.store.entries; }
    },
    methods: {
        // could ignore that
        on_delete(event){
            const entry_id = event.target.dataset['id']
            if( this.ask_before_delete && !window.confirm('Confirm delete?')){
                return; }
            this.$G.data.delete(entry_id);
        }
    }
};
