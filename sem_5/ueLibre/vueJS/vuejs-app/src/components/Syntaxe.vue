<!-- <template>
    <p>v-bind : permet de lier dynamiquement un attribut HTML à une expression JavaScript.</p><br>
    <a v-bind:href="url">Lien vers Vue.js</a><br>
    <p>Enlevez le v-bind pour voir</p>
</template>
  
  <script>
    export default {
        data() {
            return {
                url:'https://vuejs.org'
                };
        },
        };

  </script>  -->



<!-- 
<template>
    <p>v-for : permet de boucler sur un tableau ou un objet pour générer une liste d'éléments.</p><br>
    <ul>    
        <li v-for="item in items">
            {{ item.id}} {{ item.text }}
        </li><br>
    </ul>
</template>
  
  <script>
 
export default {
  data() {
    return {
        items: [
        { id: 1, text: 'Le monde ou rien' },
        { id: 2, text: 'machété machété comme un psychopathe'},
        { id: 3, text: 'La mort ou tchitchi'}
      ]
    };
  },
};
</script>  -->



<template>
    <p>v-model :  permet de créer une liaison bidirectionnelle entre un champ de formulaire et une propriété Vue.</p><br>
    <input v-model="message" placeholder="Entrez un message">
    <p>Vous avez écrit : {{ message }}</p>
</template>
  
  <script>
 
export default {
  data() {
    return {
        message: ''
        };
  },
};
</script> 





