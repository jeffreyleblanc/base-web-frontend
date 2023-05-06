<template>
<span v-html="svg"></span>
</template>

<script>
export default {
    props: {
        icon: {
            type: String,
            required: true
        }
    },
    data(){ return {
        id: Math.round(100*Math.random())
    } },
    computed:{
        // make sure this only updates when just the specific key changes
        // not the whole iconstore...
        svg(){
            console.log('computed::svg updated for',this.id,this.icon);
            return this.$G.icons.vstore[this.icon];
        }
    },
    created(){
        console.log('created:',this.icon)
        this.$G.icons.fetch(this.icon);
    }
};



</script>