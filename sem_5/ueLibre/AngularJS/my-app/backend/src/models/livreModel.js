import db from '../database/index.js';
const livreModel = {
    create: (titre, auteur, disponible, callback) => {
        db.run(`INSERT INTO livres (titre, auteur, disponible) VALUES (?, ?, ?)`,
            [titre, auteur, disponible], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID);
            });
    },

    getAll: (callback) => {
        db.all(`SELECT * FROM livres`, callback);
    },

    getById: (id, callback) => {
        db.get(`SELECT * FROM livres WHERE id = ?`, [id], callback);
    },

    update: (id, titre, auteur, disponible, callback) => {
        db.run(`UPDATE livres SET titre = ?, auteur = ?, disponible = ? WHERE id = ?`,
            [titre, auteur, disponible, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM livres WHERE id = ?`, [id], callback);
    }
};

export default livreModel;