import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'

// createServer : Fonction pour créer un serveur HTTP.
// Fonctions de graphql-yoga pour créer un schéma GraphQL et configurer le serveur.

// createYoga est utilisé pour créer une instance de serveur GraphQL qui gère les requêtes et les réponses.
const yoga = createYoga({
    // Crée un schéma GraphQL.
  schema: createSchema({
    // Définit les types de données. 
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String,
      }
    `,
    // calcul: Int
    // calcul: () => 2+2

    // Définit comment résoudre les requêtes.
    resolvers: {
      Query: {
        hello: () => 'Hello word!',
      }
    }
  })
})

// Crée un serveur HTTP qui utilise le middleware de graphql-yoga.
const server = createServer(yoga)


// Le serveur écoute sur le port 4000. Un message est affiché dans la console pour indiquer que le serveur est en cours d'exécution et accessible à l'URL spécifiée.
server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})