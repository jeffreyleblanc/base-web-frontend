/* Copyright 2022 Jeffrey LeBlanc */

async function async_main(){
    console.log('Running Async Main!');

    const template = `
    <div class="p-4">
        <nav>
            <div class="text-blue-700">Hello</div>
        </nav>
        <main>
            <p>world!</p>
        </main>
    <div>`;
    const app = Vue.createApp({
        template
    });
    app.mount('#mount');
}

async_main();
