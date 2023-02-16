
const template = `
<section>
    <h2>Object Not Found!</h2>
    <div>{{name}}</div>
    <div>{{id}}</div>
</section>
`

export default {
    template,
    computed: {
        name(){ return this.$route.params.name; },
        id(){ return this.$route.params.id; }
    }
}
