<template>
   <div id="app">
    <p>{{ count }}</p>
    <button @click="increment">+</button>
    <button @click="decrement">-</button>
 </div>
</template>

<script setup>
   import { ref } from 'vue'
    const count = ref(0)

    const increment = () => {
        count.value++
    }
    const decrement = () => {
        count.value--
    }

   
</script>

<style>
    
</style>