import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const empruntModel = {
    // ✅ Ajouter un emprunt
    async create(personneId, livreId, dateEmprunt, dateRetour) {
        return await prisma.emprunt.create({
            data: {
                personneId,
                livreId,
                dateEmprunt: new Date(dateEmprunt),
                dateRetour: dateRetour ? new Date(dateRetour) : null,
            },
        });
    },

    // ✅ Récupérer tous les emprunts
    async getAll() {
        return await prisma.emprunt.findMany({
            include: {
                personne: true,
                livre: true,
            },
        });
    },

    // ✅ Récupérer un emprunt par son ID
    async getById(id) {
        return await prisma.emprunt.findUnique({
            where: { id: Number(id) },
            include: {
                personne: true,
                livre: true,
            },
        });
    },

    // ✅ Mettre à jour un emprunt (changer la date de retour)
    async update(id, dateRetour) {
        return await prisma.emprunt.update({
            where: { id: Number(id) },
            data: { dateRetour: new Date(dateRetour) },
        });
    },

    // ✅ Supprimer un emprunt
    async delete(id) {
        return await prisma.emprunt.delete({
            where: { id: Number(id) },
        });
    }
};

export default empruntModel;




// import  db from '../database/index.js';

// const empruntModel = {
//     create: (personneId, livreId, dateEmprunt, dateRetour, callback) => {
//         db.run(`INSERT INTO emprunts (personneId, livreId, dateEmprunt, dateRetour) VALUES (?, ?, ?, ?)`,
//             [personneId, livreId, dateEmprunt, dateRetour], function (err) {
//                 if (err) {
//                     return callback(err);
//                 }
//                 callback(null, this.lastID);
//             });
//     },

//     getAll: (callback) => {
//         db.all(`SELECT * FROM emprunts`, callback);
//     },

//     getById: (id, callback) => {
//         db.get(`SELECT * FROM emprunts WHERE id = ?`, [id], callback);
//     },

//     update: (id, dateRetour, callback) => {
//         db.run(`UPDATE emprunts SET dateRetour = ? WHERE id = ?`,
//             [dateRetour, id], callback);
//     },

//     delete: (id, callback) => {
//         db.run(`DELETE FROM emprunts WHERE id = ?`, [id], callback);
//     }
// };

// export default empruntModel;