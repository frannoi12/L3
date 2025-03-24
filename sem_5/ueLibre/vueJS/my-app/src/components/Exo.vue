<template>
    <!-- <h1>Bonsoir les putes</h1> -->
     <!-- <p>Test des count : {{ count }}</p>
     <button @click="increment">+</button>
     <button @click="decrement">-</button> -->
     <!-- <p>v-if</p><br>
     <p @if="isVisible"> Ce message est visible !!</p> -->

     <!-- <p>v-on : permet d'attacher un écouteur d'évènement </p>
     <button @click="sayHello"> Cliquez moi !!</button> -->

     <p>v-show : permet de basculer la visibilité d'un élément en fonction d'une expression booléenne .</p>
     <p v-show="isVisible">Ce message est visible !!</p>
</template>

<script>
// setup
// import {ref} from 'vue'

// const count = ref(0)

// const decrement = () => {
//     count.value--
// }

// const increment = () => {
//     count.value++
// }


export default{
    data(){
        return {
            isVisible: false,
        }
    }
};



// export default{
//     methods: {
//         sayHello : function () {
//             alert('Bonjour! je sais que tu à cliqué !!')
//         }
//     },
// }

</script>


<style></style>