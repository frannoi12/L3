<script>
export default {
    data() {
        return {
            id: null, // Stocke l'ID du livre à modifier
            titre: '',
            auteur: '',
            disponible: 'oui'
        };
    },
    methods: {
        async loadLivre(id) {
            try {
                const response = await fetch(`http://localhost:3000/livres/${id}`);
                if (!response.ok) {
                    throw new Error('Erreur HTTP ! statut : ' + response.status);
                }
                const livre = await response.json();
                this.id = livre.id;
                this.titre = livre.titre;
                this.auteur = livre.auteur;
                this.disponible = livre.disponible ? "oui" : "non";
            } catch (e) {
                console.error("Erreur lors du chargement :", e);
            }
        },
        async updateLivre() {
            try {
                const response = await fetch(`http://localhost:3000/livres/${this.id}`, {
                    method: 'PUT', // Utilisation de la méthode PUT
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        titre: this.titre,
                        auteur: this.auteur,
                        disponible: this.disponible === "oui" // Conversion en Boolean
                    })
                });
                if (!response.ok) {
                    throw new Error('Erreur HTTP ! statut : ' + response.status);
                }
                this.$router.push('/'); // Redirection après la mise à jour
            } catch (e) {
                console.error("Erreur lors de la mise à jour :", e);
            }
        }
    },
    created() {
        const id = this.$route.params.id; // Récupérer l'ID depuis l'URL
        if (id) {
            this.loadLivre(id);
        }
    }
};
</script>

<template>
    <div>
        <h1>Modifier un livre</h1>
        <form @submit.prevent="updateLivre">
            <label for="titre">Titre</label>
            <input type="text" id="titre" v-model="titre">
            <label for="auteur">Auteur</label>
            <input type="text" id="auteur" v-model="auteur">
            <label for="disponible">Disponibilité</label>
            <select id="disponible" v-model="disponible">
                <option value="oui">Oui</option>
                <option value="non">Non</option>
            </select>
            <button type="submit">Modifier</button>
        </form>
    </div>
</template>
