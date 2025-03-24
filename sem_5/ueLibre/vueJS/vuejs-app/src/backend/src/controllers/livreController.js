import livreModel from "../models/livreModel.js";

const livreController = {
    // ✅ Créer un livre
    async create(req, res) {
        try {
            const { titre, auteur, disponible } = req.body;
            const livre = await livreModel.create(titre, auteur, disponible);
            res.status(201).json({ message: "Livre créé avec succès", livre });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la création du livre", error: error.message });
        }
    },

    // ✅ Récupérer tous les livres
    async getAll(req, res) {
        try {
            const livres = await livreModel.getAll();
            res.json(livres);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
        }
    },

    // ✅ Récupérer un livre par son ID
    async getById(req, res) {
        try {
            const { id } = req.params;
            const livre = await livreModel.getById(Number(id));

            if (!livre) {
                return res.status(404).json({ message: "Livre non trouvé" });
            }

            res.json(livre);
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la récupération", error: error.message });
        }
    },

    // ✅ Mettre à jour un livre
    async update(req, res) {
        try {
            const { id } = req.params;
            const { titre, auteur, disponible } = req.body;

            const livre = await livreModel.update(Number(id), titre, auteur, disponible);
            res.json({ message: "Livre mis à jour avec succès!", livre });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la mise à jour", error: error.message });
        }
    },

    // ✅ Supprimer un livre
    async delete(req, res) {
        try {
            const { id } = req.params;
            await livreModel.delete(Number(id));
            res.json({ message: "Livre supprimé avec succès!" });
        } catch (error) {
            res.status(500).json({ message: "Erreur lors de la suppression", error: error.message });
        }
    }
};

export default livreController;



// // controllers/livreController.js
// import livreModel from '../models/livreModel.js'; // Assurez-vous que ce modèle existe

// // controllers/livreController.js
// const livreController = {
//     create: (req, res) => {
//         const { titre, auteur, disponible } = req.body;
//         livreModel.create(titre, auteur, disponible, (err, id) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la création du livre', error: err.message });
//             }
//             res.status(201).json({ message: 'Livre créé avec succès', id });
//         });
//     },

//     getAll: (req, res) => {
//         livreModel.getAll((err, livres) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
//             }
//             res.json(livres);
//         });
//     },

//     getById: (req, res) => {
//         const { id } = req.params;
//         livreModel.getById(id, (err, livre) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la récupération', error: err.message });
//             }
//             if (!livre) {
//                 return res.status(404).json({ message: 'Livre non trouvé' });
//             }
//             res.json(livre);
//         });
//     },

//     update: (req, res) => {
//         const { id } = req.params;
//         const { titre, auteur, disponible } = req.body;
//         livreModel.update(id, titre, auteur, disponible, (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la mise à jour', error: err.message });
//             }
//             res.json({ message: 'Livre mis à jour avec succès!' });
//         });
//     },

//     delete: (req, res) => {
//         const { id } = req.params;
//         livreModel.delete(id, (err) => {
//             if (err) {
//                 return res.status(500).json({ message: 'Erreur lors de la suppression', error: err.message });
//             }
//             res.json({ message: 'Livre supprimé avec succès!' });
//         });
//     }
// };

// export default livreController;