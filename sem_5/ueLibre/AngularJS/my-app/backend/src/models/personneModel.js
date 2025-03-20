// models/personneModel.js
import db from '../database/index.js'; // Assurez-vous que le chemin vers votre base de données est correct

const personneModel = {
    create: (nom, prenom, statut, callback) => {
        db.run(`INSERT INTO personnes (nom, prenom, statut) VALUES (?, ?, ?)`, 
            [nom, prenom, statut], function (err) {
                if (err) {
                    return callback(err);
                }
                callback(null, this.lastID);
            });
    },

    getAll: (callback) => {
        db.all(`SELECT * FROM personnes`, callback);
    },

    getById: (id, callback) => {
        db.get(`SELECT * FROM personnes WHERE id = ?`, [id], callback);
    },

    update: (id, nom, prenom, statut, callback) => {
        db.run(`UPDATE personnes SET nom = ?, prenom = ?, statut = ? WHERE id = ?`,
            [nom, prenom, statut, id], callback);
    },

    delete: (id, callback) => {
        db.run(`DELETE FROM personnes WHERE id = ?`, [id], callback);
    }
};

export default personneModel;
