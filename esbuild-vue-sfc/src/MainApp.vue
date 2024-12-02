<template>
<main>
    <h1>This is a test</h1>
    <p>count: {{count}}</p>
    <button @click="count+=1">
        increment
    </button>
</main>
</template>

<script>
export default {
    data(){ return {
        count: 0
    } }
}
</script>