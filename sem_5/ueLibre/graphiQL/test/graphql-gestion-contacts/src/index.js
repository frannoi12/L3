import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone"; // Importer la méthode pour un serveur autonome
import dotenv from 'dotenv';
import typeDefs from "./schema.js";
import resolvers from "./resolvers.js";
import jwt from "jsonwebtoken";

dotenv.config();

const PORT = process.env.PORT || 4000;


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || "";
    const token = authHeader.replace("Bearer ", "");

    if (!token) {
      console.log("⚠️ Aucun token reçu");
      return { userId: null }; // Retourner `null` pour montrer qu'il n'y a pas d'auth
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("✅ Token décodé :", decoded);
      return { userId: decoded.userId }; // Garder la cohérence avec `context.userId`
    } catch (error) {
      console.error("❌ Token invalide :", error.message);
      return { userId: null };
    }
  },
});


// Démarre le serveur autonome
startStandaloneServer(server, {
  listen: { port: PORT }, 
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
}).catch((err) => {
  console.error("❌ Error starting server:", err);
});
