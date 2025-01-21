import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone'; // Importer la méthode pour un serveur autonome
import typeDefs from './schema.js';
import resolvers from './resolvers.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground : true,
});

// Démarre le serveur autonome
startStandaloneServer(server, {
  listen: { port: 4000 }, // Spécifie le port ici
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});