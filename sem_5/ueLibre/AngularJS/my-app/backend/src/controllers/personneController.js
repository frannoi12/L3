// controllers/personneController.js
import personneModel from '../models/personneModel.js'; // Assurez-vous que ce chemin est correct

// controllers/personneController.js
const personneController = {
    create: (req, res) => {
        const { nom, prenom, statut } = req.body;
        personneModel.create(nom, prenom, statut, (err, id) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la création de la personne', error: err.message });
            }
            res.status(201).json({ message: 'Personne créée avec succès', id });
        });
    },

    getAll: (req, res) => {
        personneModel.getAll((err, personnes) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
            }
            res.json(personnes);
        });
    },

    getById: (req, res) => {
        const { id } = req.params;
        personneModel.getById(id, (err, personne) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
            }
            if (!personne) {
                return res.status(404).json({ message: 'Personne non trouvée' });
            }
            res.json(personne);
        });
    },

    update: (req, res) => {
        const { id } = req.params;
        const { nom, prenom, statut } = req.body;
        personneModel.update(id, nom, prenom, statut, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
            }
            res.json({ message: 'Personne mise à jour avec succès!' });
        });
    },

    delete: (req, res) => {
        const { id } = req.params;
        personneModel.delete(id, (err) => {
            if (err) {
                return res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
            }
            res.json({ message: 'Personne supprimée avec succès!' });
        });
    }
};

export default personneController;