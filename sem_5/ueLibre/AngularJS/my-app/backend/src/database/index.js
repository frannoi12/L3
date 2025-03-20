import sqlite3 from 'sqlite3'; // Utilisation de l'importation moderne
import path from 'path';

const __dirname = path.dirname(new URL(import.meta.url).pathname);

// Connexion à la base de données SQLite
const db = new sqlite3.Database(path.join(__dirname, 'database.db'), (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err.message);
    } else {
        console.log('Connecté à la base de données SQLite.');
    }
});


// Création des tables si elles n'existent pas
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS personnes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT,
        prenom TEXT,
        statut TEXT CHECK(statut IN ('élève', 'enseignant'))
    )`, (err) => {
        if (err) console.error('Erreur lors de la création de la table personnes:', err.message);
    });

    db.run(`CREATE TABLE IF NOT EXISTS livres (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT,
        auteur TEXT,
        disponible BOOLEAN
    )`, (err) => {
        if (err) console.error('Erreur lors de la création de la table livres:', err.message);
    });

    db.run(`CREATE TABLE IF NOT EXISTS emprunts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        personneId INTEGER,
        livreId INTEGER,
        dateEmprunt TEXT,
        dateRetour TEXT,
        FOREIGN KEY(personneId) REFERENCES personnes(id),
        FOREIGN KEY(livreId) REFERENCES livres(id)
    )`, (err) => {
        if (err) console.error('Erreur lors de la création de la table emprunts:', err.message);
    });
});

// Exporter la base de données pour une utilisation ultérieure
export default db;
