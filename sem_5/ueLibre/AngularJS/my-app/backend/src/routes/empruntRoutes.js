// routes/empruntRoutes.js
import express from 'express';
import empruntController from '../controllers/empruntController.js'; // Assurez-vous que ce chemin est correct

const router = express.Router();

// Définir les routes pour les emprunts
router.post('/', empruntController.create); // Créer un nouvel emprunt
router.get('/', empruntController.getAll); // Obtenir tous les emprunts
router.get('/:id', empruntController.getById); // Obtenir un emprunt par ID
router.put('/:id', empruntController.update); // Mettre à jour un emprunt par ID
router.delete('/:id', empruntController.delete); // Supprimer un emprunt par ID

export default router;
