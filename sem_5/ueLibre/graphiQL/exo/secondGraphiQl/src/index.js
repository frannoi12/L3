import { createServer } from 'node:http'
import { createSchema, createYoga } from 'graphql-yoga'

const yoga = createYoga({
  // Définnissons notre schéma de graphql
  schema: createSchema({
    //  GraphQL décrit quelles données peuvent être interrogées à partir de l'API. 
    // L'ensemble de ces fonctionnalités est appelé schéma du service et les clients
    // peuvent utiliser ce schéma pour envoyer des requêtes à l'API qui renvoient des
    // résultats prévisibles. 
    typeDefs: /* GraphQL */ `
      type Query {
        hello: String,
        calcul: Int,
      }
    `,
    resolvers: {
      Query: {
        hello: () => 'Hello World!',
        calcul: ()=> 2+2
      }
    }
  })
})

const server = createServer(yoga)

server.listen(4000, () => {
  console.info('Server is running on http://localhost:4000/graphql')
})