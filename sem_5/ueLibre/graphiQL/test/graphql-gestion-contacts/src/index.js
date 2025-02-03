import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"; // Importer la méthode pour un serveur autonome
import dotenv from 'dotenv';
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";

dotenv.config();


const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Démarre le serveur autonome
startStandaloneServer(server, {
  listen: { port: 4000 }, // Spécifie le port ici
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
