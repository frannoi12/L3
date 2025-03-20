import express from 'express';
import cors from 'cors';
import personneRoutes from './routes/personneRoutes.js';
import livreRoutes from './routes/livreRoutes.js';
import empruntRoutes from './routes/empruntRoutes.js';

const app = express();

// Middleware pour parser les requêtes JSON et URL-encoded
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuration CORS
app.use(cors({
  origin: 'http://localhost:4200', // Autoriser uniquement l'origine de votre application Angular
  methods: 'GET,POST,PUT,DELETE', // Méthodes HTTP autorisées
  allowedHeaders: 'Content-Type,Authorization' // En-têtes autorisés
}));

// Gérer les requêtes OPTIONS (preflight)
app.options('*', cors());

// Utilisation des routes
app.use('/personnes', personneRoutes);
app.use('/livres', livreRoutes);
app.use('/emprunts', empruntRoutes);

// Middleware de gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Une erreur s\'est produite sur le serveur.' });
});

// Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});