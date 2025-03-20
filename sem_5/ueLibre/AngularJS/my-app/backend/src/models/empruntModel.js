import  db from '../database/index.js';

const empruntModel = {
    create: (personneId, livreId, dateEmprunt, dateRetour, callback) => {
        db.run(`INSERT INTO emprunts (personneId, livreId, dateEmprunt, dateRetour) VALUES (?, ?, ?, ?)`,
            [personneId, livreId, dateEmprunt, dateRetour], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID);
            });
    },

    getAll: (callback) => {
        db.all(`SELECT * FROM emprunts`, callback);
    },

    getById: (id, callback) => {
        db.get(`SELECT * FROM emprunts WHERE id = ?`, [id], callback);
    },

    update: (id, dateRetour, callback) => {
        db.run(`UPDATE emprunts SET dateRetour = ? WHERE id = ?`,
            [dateRetour, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM emprunts WHERE id = ?`, [id], callback);
    }
};

export default empruntModel;