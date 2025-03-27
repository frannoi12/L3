<template>
    <table>
        <thead>
            <tr>
                <th>Titre</th>
                <th>Auteur</th>
                <th>Disponiblite</th>
                <th>Actions</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="livre in livres" :key="livre.id">
                <td>{{ livre.titre }}</td>
                <td>{{ livre.auteur }}</td>
                <td v-if="livre.disponible==1">{{ true }}</td>
                <td v-else>{{ false }}</td>
                <td>
                    <button @click="deleteLivre(livre.id)">Supprimer</button>
                    <button @click="editLivre(livre.id)">Editer</button>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script>
    // import { ref } from 'vue'
     
    // const livres = ref([
    //     { id: 1, titre: 'Le seigneur des anneaux', auteur: 'J.R.R. Tolkien', disponiblite: 'oui' },
    //     { id: 2, titre: 'Harry Potter', auteur: 'J.K. Rowling', disponiblite: 'non' },
    //     { id: 3, titre: 'Le petit prince', auteur: 'Antoine de Saint-Exupéry', disponiblite: 'oui' }
    // ])
    export default {
        data(){
            return {
                livres:[]
            }
        },
        mounted(){
            this.fetchLivres()
        },
        methods:{
            async deleteLivre(id){
                try{
                    const response = await fetch('http://localhost:3000/livres/' + id, {
                        method: 'DELETE'
                    })
                    if(!response.ok){
                        throw new Error('Erreur HTTP ! statut : ' + response.status)
                    }
                    this.fetchLivres()
                }
                catch(e){
                    console.log(e)
                }
            },

            async editLivre(id){
                this.$router.push({name: 'update', params: {id}})
            },
            async fetchLivres(){
            try{
                const response = await fetch('http://localhost:3000/livres')
                if(!response.ok){
                    throw new Error('Erreur HTTP ! statut : ' + response.status)
                }
                this.livres = await response.json()
            }
            catch(e){
                console.log(e)
            }
        
        }
    }
} 
</script>
