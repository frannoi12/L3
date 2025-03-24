import empruntModel from "../models/empruntModel.js";

const empruntController = {
    // ✅ Créer un emprunt
    async create(req, res) {
        try {
            const { personneId, livreId, dateEmprunt, dateRetour } = req.body;
            const emprunt = await empruntModel.create(Number(personneId), Number(livreId), dateEmprunt, dateRetour);
            res.status(201).json({ message: "Emprunt créé avec succès", emprunt });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création de l'emprunt", error: error.message });
        }
    },

    // ✅ Récupérer tous les emprunts
    async getAll(req, res) {
        try {
            const emprunts = await empruntModel.getAll();
            res.json(emprunts);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
        }
    },

    // ✅ Récupérer un emprunt par ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const emprunt = await empruntModel.getById(Number(id));

            if (!emprunt) {
                return res.status(404).json({ message: "Emprunt non trouvé" });
            }

            res.json(emprunt);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
        }
    },

    // ✅ Mettre à jour un emprunt
    async update(req, res) {
        try {
            const { id } = req.params;
            const { dateRetour } = req.body;

            const emprunt = await empruntModel.update(Number(id), dateRetour);
            res.json({ message: "Emprunt mis à jour avec succès!", emprunt });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
        }
    },

    // ✅ Supprimer un emprunt
    async delete(req, res) {
        try {
            const { id } = req.params;
            await empruntModel.delete(Number(id));
            res.json({ message: "Emprunt supprimé avec succès!" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
        }
    }
};

export default empruntController;





// // controllers/empruntController.js
// import empruntModel from '../models/empruntModel.js'; // Assurez-vous que ce modèle existe

// // controllers/empruntController.js
// const empruntController = {
//     create: (req, res) => {
//         const { personneId, livreId, dateEmprunt, dateRetour } = req.body;
//         empruntModel.create(personneId, livreId, dateEmprunt, dateRetour, (err, id) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la création de l\'emprunt', error: err.message });
//             }
//             res.status(201).json({ message: 'Emprunt créé avec succès', id });
//         });
//     },

//     getAll: (req, res) => {
//         empruntModel.getAll((err, emprunts) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
//             }
//             res.json(emprunts);
//         });
//     },

//     getById: (req, res) => {
//         const { id } = req.params;
//         empruntModel.getById(id, (err, emprunt) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
//             }
//             if (!emprunt) {
//                 return res.status(404).json({ message: 'Emprunt non trouvé' });
//             }
//             res.json(emprunt);
//         });
//     },

//     update: (req, res) => {
//         const { id } = req.params;
//         const { personneId, livreId, dateEmprunt, dateRetour } = req.body;
//         empruntModel.update(id, personneId, livreId, dateEmprunt, dateRetour, (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
//             }
//             res.json({ message: 'Emprunt mis à jour avec succès!' });
//         });
//     },

//     delete: (req, res) => {
//         const { id } = req.params;
//         empruntModel.delete(id, (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
//             }
//             res.json({ message: 'Emprunt supprimé avec succès!' });
//         });
//     }
// };

// export default empruntController;