<script>
    export default {
        data(){
            return {
                titre: '',
                auteur: '',
                disponible: 'oui'
            }
        },
        methods:{
            async createLivre(){
                try{
                    const response = await fetch('http://localhost:3000/livres', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            titre: this.titre,
                            auteur: this.auteur,
                            disponible: this.disponible === 'oui'
                        })
                      
                    })
                    if(!response.ok){
                        throw new Error('Erreur HTTP ! statut : ' + response.status)
                    }
                    this.$router.push('/')
                }
                catch(e){
                    console.log(e)
                }
            }
        }
    }
</script>

<template>
    <div>
        <h1>Créer un livre</h1>
        <form @submit.prevent="createLivre">
            <label for="titre">Titre</label>
            <input type="text" id="titre" v-model="titre">
            <label for="auteur">Auteur</label>
            <input type="text" id="auteur" v-model="auteur">
            <label for="disponible">Disponibilité</label>
            <select id="disponible" v-model="disponible">
                <option value="oui">Oui</option>
                <option value="non">Non</option>
            </select>
            <button type="submit">Créer</button>
        </form>
    </div>
</template>



<style>
    form{
        display: flex;
        flex-direction: column;
        width: 50%;
        margin: 0 auto;
    }
    label{
        margin-top: 10px;
    }
    input, select{
        margin-top: 5px;
        padding: 5px;
    }
    button{
        margin-top: 10px;
        padding: 5px;
        background-color: #007bff;
        color: white;
        border: none;
        cursor: pointer;
    }
    button:hover{
        background-color: #0056b3;
    }

</style>