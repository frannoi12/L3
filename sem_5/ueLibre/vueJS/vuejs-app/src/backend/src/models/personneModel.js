import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const personneModel = {
    // ✅ Ajouter une personne
    async create(nom, prenom, statut) {
        return await prisma.personne.create({
            data: { nom, prenom, statut }
        });
    },

    // ✅ Récupérer toutes les personnes
    async getAll() {
        return await prisma.personne.findMany({
            include: { emprunts: true },
        });
    },

    // ✅ Récupérer une personne par son ID
    async getById(id) {
        return await prisma.personne.findUnique({
            where: { id: Number(id) },
            include: { emprunts: true },
        });
    },

    // ✅ Mettre à jour une personne
    async update(id, nom, prenom, statut) {
        return await prisma.personne.update({
            where: { id: Number(id) },
            data: { nom, prenom, statut },
        });
    },

    // ✅ Supprimer une personne
    async delete(id) {
        return await prisma.personne.delete({
            where: { id: Number(id) },
        });
    }
};

export default personneModel;











// // models/personneModel.js
// import db from '../database/index.js'; // Assurez-vous que le chemin vers votre base de données est correct

// const personneModel = {
//     create: (nom, prenom, statut, callback) => {
//         db.run(`INSERT INTO personnes (nom, prenom, statut) VALUES (?, ?, ?)`, 
//             [nom, prenom, statut], function (err) {
//                 if (err) {
//                     return callback(err);
//                 }
//                 callback(null, this.lastID);
//             });
//     },

//     getAll: (callback) => {
//         db.all(`SELECT * FROM personnes`, callback);
//     },

//     getById: (id, callback) => {
//         db.get(`SELECT * FROM personnes WHERE id = ?`, [id], callback);
//     },

//     update: (id, nom, prenom, statut, callback) => {
//         db.run(`UPDATE personnes SET nom = ?, prenom = ?, statut = ? WHERE id = ?`,
//             [nom, prenom, statut, id], callback);
//     },

//     delete: (id, callback) => {
//         db.run(`DELETE FROM personnes WHERE id = ?`, [id], callback);
//     }
// };

// export default personneModel;
