/* Copyright Jeffrey LeBlanc */

import {make_base62_id} from '../tools/common.js'

const template = `
<section class="p-4 flex flex-col gap-y-2 border border-gray-400 rounded">
    <h3 class="font-bold">Add new entry</h3>
    <div class="flex flex-row gap-x-4">
        <label>Text</label>
        <input class="px-2 border border-gray-400 rounded" type="text" v-model="text"></input>
    </div><div>
        <button class="h-6 bg-blue-600 text-sm text-white px-2 rounded" @click="add">
            Add
        </button
    </div>
</section>`;

export default {
    template,
    data(){
        return {
            text: ''
        }
    },
    methods: {
        add(){
            let text = this.text;
            if(text==''){ text = make_base62_id(); }
            this.$G.data.make_new(text)
            this.text = '';
        }
    }
};
