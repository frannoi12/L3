<template>
    <p>v-if</p><br>
    <p @if="isShow">Ce message est visible</p>
    <button v-on:click="savHello">click ici</button>
    <p v-show="isVisible">Ce message peut etre cacher</p>
</template>

<script>
//    export default {data(){
//         return {
//             isShow: false
//         };
//     },
//     methods: {
//         savHello: function () {
//             alert('Hello');
//         }
//     }
//  }
 
 export default {
    data(){
    return {
        isVisible: true
    }
    },
    methods: {
        savHello: function () {
            alert('Hello');
        }
    }
}
 






</script>

<style> 
    p {
        color: red;
    }
    button {
        color: blue;
    }
</style>