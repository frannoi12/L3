// Description: This file contains the router configuration.
import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import About from '../views/About.vue';
import Contact from '../views/Contact.vue';
import Liste from '@/Pages/Livres/Liste.vue';
const routes = [
  {
    path: '/',
    name: 'Liste',
    component: Liste
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/contact',
    name: 'Contact',
    component: Contact
  }
  
];
//createRouter crée une instance de router
//history est une option de configuration du routeur
//createWebHistory est une fonction qui crée une instance de l'historique du navigateur
//routes est un tableau d'objets de route
//chaque objet de route a trois propriétés: path, name et component
//path est le chemin de l'URL
//name est le nom de la route
//component est le composant à afficher lorsque la route est activée
const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;