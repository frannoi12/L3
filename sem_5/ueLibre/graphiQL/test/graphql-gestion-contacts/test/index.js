// import { ApolloServer } from "@apollo/server"
// import { startStandaloneServer } from "@apollo/server/standalone"
// import gql from "graphql-tag"
// import fs from 'fs'
// import userResolvers from './resolveurs/UserResolver.js'
// import contactResolvers from './resolveurs/ContactResolver.js'

// const  typeDefs = gql(`
//   ${fs.readFileSync('typedefs/UserTypedef.gql','utf8')}
//   ${fs.readFileSync('typedefs/ContactTypedef.graphql','utf8')}
//   `)  


//   const resolvers = {
//     Query:{
//       ...userResolvers.Query,
//       ...contactResolvers.Query
//     },
//     Mutation:{
//       ...contactResolvers.Mutation,
//       ...userResolvers.Mutation
//     }
    
    
//   }

//   const server = new ApolloServer(
//     { typeDefs, resolvers }
//   )
// startStandaloneServer(server,{
//   listen:4000, path:'/graphql'}).then(({url})=>{
//     console.log(`serveur demare sur ${url}`);
    
//   })
  


// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import gql from "graphql-tag";
// import fs from 'fs';
// import userResolvers from './resolveurs/UserResolver.js';
// import contactResolvers from './resolveurs/ContactResolver.js';
// import { verifyToken , generateToken} from './auth/AuthUtils.js'; // Import de la fonction de vérification du token

// import dotenv from 'dotenv';
// dotenv.config();
// // Charger les typedefs à partir des fichiers externes
// const typeDefs = gql(`
//   ${fs.readFileSync('typedefs/UserTypedef.gql', 'utf8')}
//   ${fs.readFileSync('typedefs/ContactTypedef.graphql', 'utf8')}
// `);

// // Combine les résolveurs de contacts et utilisateurs
// const resolvers = {
//   Query: {
//     ...userResolvers.Query,
//     ...contactResolvers.Query,
//   },
//   Mutation: {
//     ...userResolvers.Mutation,
//     ...contactResolvers.Mutation,
//   },
// };


// // Middleware pour vérifier le token JWT
// const authContext = ({ req }) => {
//   const token = req.headers.authorization || '';

//   if (token) {
//     try {
//       const decoded = verifyToken(token.replace('Bearer ', '')); 
//       if (decoded) {
//         return { userId: decoded.id }; 
//       }
//     } catch (error) {
//       throw new Error("Token invalide ou expiré");
//     }
//   }

//   throw new Error("Authentification requise");
// };



// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
//   context: authContext,
// });


// startStandaloneServer(server, {
//   listen: { port: 4000 },
//   path: "/graphql",
// }).then(({ url }) => {
//   console.log(`Serveur démarré sur ${url}`);
// });





























// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

// import { ApolloServer } from "@apollo/server";
// import { startStandaloneServer } from "@apollo/server/standalone";
// import gql from "graphql-tag";
// import fs from 'fs';
// import userResolvers from './resolveurs/UserResolver.js';
// import contactResolvers from './resolveurs/ContactResolver.js';
// import { verifyToken } from './auth/AuthUtils.js';
// import dotenv from 'dotenv';

// dotenv.config();

// // Charger les typedefs à partir des fichiers externes
// const typeDefs = gql(`
//   ${fs.readFileSync('typedefs/UserTypedef.gql', 'utf8')}
//   ${fs.readFileSync('typedefs/ContactTypedef.graphql', 'utf8')}
// `);

// // Combine les résolveurs de contacts et utilisateurs
// const resolvers = {
//   Query: {
//     ...userResolvers.Query,
//     ...contactResolvers.Query,
//   },
//   Mutation: {
//     ...userResolvers.Mutation,
//     ...contactResolvers.Mutation,
//   },
// };

// const authContext = async ({ req }) => {
//   const token = req.headers.authorization?.replace("Bearer ", "") || "";

//   try {
//     const decoded = verifyToken(token);

//     // Vérification en base de données
//     const user = await prisma.user.findUnique({
//       where: { id: decoded.id },
//       select: { id: true, name: true, email: true } 
//     });

//     if (!user) {
//       console.log("Utilisateur invalide");
//       return { user: null, prisma, message: "Utilisateur non trouvé" }; 
//     }

//     console.log("Utilisateur authentifié avec succès !");
    
//     // Retourner l'utilisateur avec les informations supplémentaires
//     return { 
//       user, 
//       prisma, 
//       message: "Connexion réussie" // Message de connexion réussie
//     };

//   } catch (error) {
//     console.log("Erreur de token:", error.message);
//     return { user: null, prisma, message: "Échec de l'authentification" }; // Message si le token est invalide
//   }
// };


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// const { url } = await startStandaloneServer(server, {
//   context: authContext,
//   listen: { port: 4000 },
//   path: "/graphql",
// });

// console.log(`🚀 Serveur démarré sur ${url}`);

























// import { ApolloServer } from '@apollo/server';
// import { gql } from 'graphql-tag';
// import { startStandaloneServer } from "@apollo/server/standalone";

// // Définition du schéma GraphQL
// const typeDefs = gql`
//   type Query {
//     hello: String
//     calcul(a: Int!, b: Int!): Int
//   }
// `;

// // Résolveur pour le schéma
// const resolvers = {
//   Query: {
//     hello: () => 'Hello, !',
//     calcul: (parent, args, context, info) => {
//       // Afficher les valeurs des paramètres
//       //console.log('Parent:', parent); // Devrait afficher `null` pour une requête de niveau supérieur
//       //console.log('Arguments (args):', args); // Devrait afficher {a: 5, b: 3} pour une requête comme `calcul(a: 5, b: 3)`
//       //console.log('Context:', context); // Affiche le contexte partagé, par exemple l'authentification ou autres
//       console.log('Info:', info); // Affiche des informations sur la requête, comme le nom du champ

//       // Retourne le résultat du calcul
//       return args.a + args.b;
//     },
//   },
// };

// // Créer une instance d'ApolloServer
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// // Lancer le serveur en utilisant startStandaloneServer
// const { url } = await startStandaloneServer(server, {
//   listen: { port: 4000 },
//   path: "/graphql",
// });

// console.log(`Server started at ${url}graphql`);























import { ApolloServer } from '@apollo/server';
 import { gql } from 'graphql-tag';
 import { startStandaloneServer } from "@apollo/server/standalone" ;

 // Definition du schema GraphQL
 const typeDefs = gql `


type Tache {
 id : ID !
 titre : String !
 terminer : Boolean !
 }

 type Query {
 hello : String,
 calcul(a:Int!, b:Int!):Int,
 taches:[Tache]
 }
 
 type Mutation {
 createTache(titre:String!, terminer:Boolean!): Tache,
 updateTache(id:ID!, titre:String, terminer:Boolean): Tache,
 deleteTache(id:ID!): Tache
 }

 `
 let tasks = [
     { id : 1 , titre : " Apprendre GraphQL " , terminer : false } ,
     { id : 2 , titre : " Faire les courses " , terminer : true }
     ]

 // Resolveur pour le schema
 const resolvers = {
 Query : {
 hello : () => 'Hello ,  !' ,
 calcul :(_, args)=>{
  return args.a +args.b
 },
 taches:()=> tasks
 
 } ,
 Mutation:{
    createTache : (_, {titre, terminer})=>{
     const newTask = { id : tasks.length + 1 , titre, terminer }
     tasks.push(newTask)
     return newTask
   },
   deleteTache: (_, { id }) => {
    // Trouver l'index de la tâche à supprimer
    const index = tasks.findIndex((task) => task.id == id);

    // Si la tâche n'existe pas, retourner null
    if (index === -1) {
      return null;
    }

    // Retirer la tâche du tableau en utilisant l'index trouvé
    const deletedTask = tasks.splice(index, 1)[0];

    // Retourner la tâche supprimée
    return deletedTask;
  },

  updateTache: (_, { id, titre, terminer }) => {
    // Trouver l'index de la tâche à mettre à jour
    const index = tasks.findIndex((task) => task.id == id);
    if (index === -1) {
      return null; // Si la tâche n'existe pas, retourner null
    }

    // Mettre à jour la tâche
    const taskToUpdate = tasks[index];

    if (titre !== undefined) {
      taskToUpdate.titre = titre; // Mettre à jour le titre si fourni
    }

    if (terminer !== undefined) {
      taskToUpdate.terminer = terminer; // Mettre à jour le statut terminer si fourni
    }

    return taskToUpdate; // Retourner la tâche mise à jour
  },
 }
 

 };
// Creer une instance d ’ ApolloServer
 const server = new ApolloServer ({
 typeDefs ,
 resolvers ,
 }) ;

 // Lancer le serveur en utilisant startStandaloneServer
 const { url } = await startStandaloneServer(server, {
     ecoute: { port: 4000 },
     path: "/graphql",
   });
   console.log(`Server start at ${url}graphql `);
   
  
