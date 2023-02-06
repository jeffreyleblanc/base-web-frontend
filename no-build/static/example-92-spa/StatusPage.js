/* Copyright Jeffrey LeBlanc */

const template = `
<section class="flex flex-col gap-y-4">
    <h3 class="font-bold">Status Page</h3>
</section>`;

export default {
    template,
    data(){ return {} },
    computed: {
        collections(){ return this.$G.store.collections; }
    }
};
