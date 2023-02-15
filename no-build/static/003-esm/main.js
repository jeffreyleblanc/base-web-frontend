/* Copyright 2022 Jeffrey LeBlanc */

import { createApp } from 'vue'

export default function main(){
    const app = createApp({
        template: `<p class="p-4 text-sky-700">{{message}}</p>`,
        data(){ return {
            message: 'Hello World!'
        }},
    });
    app.mount('#app');
}
