// routes/livreRoutes.js
import express from 'express';
import livreController from '../controllers/livreController.js'; // Assurez-vous que ce chemin est correct

const router = express.Router();

router.post('/test', (req, res) => {
    console.log("📡 Requête reçue :", req.body); // Vérifie les données envoyées
    // Logique pour ajouter le livre
});


// Définir les routes pour les livres
router.post('/', livreController.create); // Créer un nouveau livre
router.get('/', livreController.getAll); // Obtenir tous les livres
router.get('/:id', livreController.getById); // Obtenir un livre par ID
router.put('/:id', livreController.update); // Mettre à jour un livre par ID
router.delete('/:id', livreController.delete); // Supprimer un livre par ID

export default router;
