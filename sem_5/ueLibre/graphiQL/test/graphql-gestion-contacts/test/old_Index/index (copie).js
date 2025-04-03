// import { ApolloServer } from '@apollo/server';
// import { gql } from 'graphql-tag';
// import { startStandaloneServer } from "@apollo/server/standalone"; 

// // Définition du schéma GraphQL
// const typeDefs = gql`
//   type Tache {
//     id: ID!
//     titre: String!
//     terminer: Boolean!
//   }
//   type Query {
//     hello: String
//     calcul(a: Int, b: Int): Int
//     taches: [Tache]
//   }


//   type Mutation{
//     ajouterTache(titre: String!, terminer: Boolean!): Tache
//   }
// `;
// let taches = [
//   { id: 1, titre: "Apprendre GraphQL", terminer: false },
//   { id: 2, titre: "Faire les courses", terminer: true }
// ];

// // function getTaches() {
// //   return taches;
// // }


// // Résolvants pour le schéma
// const resolvers = {
//   Query: {
//     hello: () => 'Hello, world!',
//     calcul: (_, args) => args.a + args.b,
   
//   //  taches: getTaches  // Appel de la fonction getTaches dans le résolveur
   
//   taches :()=> taches
//   },

//   Mutation:{
//     ajouterTache: (_, {titre, terminer}) => {
//     const nouvelleTache = {
//       id: taches.length + 1,
//       titre,
//       terminer
//     };
//     taches.push(nouvelleTache);
//     return nouvelleTache;
//     }
//   }
// };


// // Créer une instance d'ApolloServer
// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });
// // Lancer le serveur en utilisant startStandaloneServer
// startStandaloneServer(server, {
//   listen: { port: 4001 }
// }).then(({ url }) => {
//   console.log(`Server ready at ${url}`);
// });





import { ApolloServer } from '@apollo/server';
import { gql } from 'graphql-tag';
import { startStandaloneServer } from '@apollo/server/standalone'; 

// Définition du schéma GraphQL
const typeDefs = gql`
  type Tache {
    id: ID!
    titre: String!
    terminer: Boolean!
  }

  type Query {
    hello: String
    calcul(a: Int, b: Int): Int
    taches: [Tache]
  }

  type Mutation {
    ajouterTache(titre: String!, terminer: Boolean!): Tache
    mettreAJourTache(id: ID!, titre: String, terminer: Boolean): Tache
    supprimerTache(id: ID!): Tache
  }
`;

let taches = [
  { id: 1, titre: 'Apprendre GraphQL', terminer: false },
  { id: 2, titre: 'Faire les courses', terminer: true }
];

// Résolvants pour le schéma
const resolvers = {
  Query: {
    hello: () => 'Hello, world!',
    calcul: (_, args) => args.a + args.b,
    taches: () => taches,
  },

  Mutation: {
    ajouterTache: (_, { titre, terminer }) => {
      const nouvelleTache = {
        id: taches.length + 1,
        titre,
        terminer
      };
      taches.push(nouvelleTache);
      return nouvelleTache;
    },

    mettreAJourTache: (_, { id, titre, terminer }) => {
      // Trouver l'index de la tâche à mettre à jour
      const tacheIndex = taches.findIndex(tache => tache.id == id);
      if (tacheIndex === -1) {
        throw new Error("Tâche non trouvée");
      }

      // Mise à jour de la tâche
      const tacheMiseAJour = {
        ...taches[tacheIndex],
        titre: titre !== undefined ? titre : taches[tacheIndex].titre,
        terminer: terminer !== undefined ? terminer : taches[tacheIndex].terminer
      };

      // Sauvegarder la tâche mise à jour
      taches[tacheIndex] = tacheMiseAJour;

      return tacheMiseAJour;
    },

    supprimerTache: (_, { id }) => {
      // Trouver l'index de la tâche à supprimer
      const tacheIndex = taches.findIndex(tache => tache.id == id);
      if (tacheIndex === -1) {
        throw new Error("Tâche non trouvée");
      }

      // Supprimer la tâche
      const [tacheSupprimee] = taches.splice(tacheIndex, 1);

      return tacheSupprimee;
    }
  }
};

// Créer une instance d'ApolloServer
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Lancer le serveur en utilisant startStandaloneServer
startStandaloneServer(server, {
  listen: { port: 4001 }
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
