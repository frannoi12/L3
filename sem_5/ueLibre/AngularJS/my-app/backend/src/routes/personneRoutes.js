import express from 'express';
import personneController from '../controllers/personneController.js';

const router = express.Router();

// Définir les routes pour les personnes
router.post('/', personneController.create); // Créer une nouvelle personne
router.get('/', personneController.getAll); // Obtenir toutes les personnes
router.get('/:id', personneController.getById); // Obtenir une personne par ID
router.put('/:id', personneController.update); // Mettre à jour une personne par ID
router.delete('/:id', personneController.delete); // Supprimer une personne par ID

export default router;
