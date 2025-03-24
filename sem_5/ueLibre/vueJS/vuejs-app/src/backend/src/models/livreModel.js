import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const livreModel = {
    // ✅ Ajouter un livre
    async create(titre, auteur, disponible) {
        return await prisma.livre.create({
            data: { titre, auteur, disponible },
        });
    },

    // ✅ Récupérer tous les livres
    async getAll() {
        return await prisma.livre.findMany();
    },

    // ✅ Récupérer un livre par son ID
    async getById(id) {
        return await prisma.livre.findUnique({
            where: { id: Number(id) },
        });
    },

    // ✅ Mettre à jour un livre
    async update(id, titre, auteur, disponible) {
        return await prisma.livre.update({
            where: { id: Number(id) },
            data: { titre, auteur, disponible },
        });
    },

    // ✅ Supprimer un livre
    async delete(id) {
        return await prisma.livre.delete({
            where: { id: Number(id) },
        });
    }
};

export default livreModel;





// import db from '../database/index.js';
// const livreModel = {
//     create: (titre, auteur, disponible, callback) => {
//         db.run(`INSERT INTO livres (titre, auteur, disponible) VALUES (?, ?, ?)`,
//             [titre, auteur, disponible], function (err) {
//                 if (err) {
//                     return callback(err);
//                 }
//                 callback(null, this.lastID);
//             });
//     },

//     getAll: (callback) => {
//         db.all(`SELECT * FROM livres`, callback);
//     },

//     getById: (id, callback) => {
//         db.get(`SELECT * FROM livres WHERE id = ?`, [id], callback);
//     },

//     update: (id, titre, auteur, disponible, callback) => {
//         db.run(`UPDATE livres SET titre = ?, auteur = ?, disponible = ? WHERE id = ?`,
//             [titre, auteur, disponible, id], callback);
//     },

//     delete: (id, callback) => {
//         db.run(`DELETE FROM livres WHERE id = ?`, [id], callback);
//     }
// };

// export default livreModel;