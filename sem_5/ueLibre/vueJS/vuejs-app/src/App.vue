<script setup>
        // import Create from 'Pages/Livres/Create.vue'
        // import Update from 'Pages/Livres/Update.vue'
        import Liste from './Pages/Livres/Liste.vue';
        import Create from './Pages/Livres/Create.vue';

</script>

<template>
  <div class="application">
    <nav>
    <ul>
      <li><router-link to="/">Home</router-link></li>
      <li><router-link to="/about">About</router-link></li>
      <li><router-link to="/contact">Contact</router-link></li>
    </ul>
  </nav>
  </div>
  <router-view></router-view>
  <!-- <Liste/>
  <Create/> -->
  <RouterLink to="/create">create</RouterLink>
</template>

<!-- <script>
       export default {
        name: 'App'
      }
</script> -->


