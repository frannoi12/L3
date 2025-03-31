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
});


// Démarre le serveur autonome
startStandaloneServer(server, {
  listen: { port: PORT }, 
  context: async ({ req }) => {
    // console.log(req);
    
    const authHeader = req.headers.authorization || "";
    // console.log("🔍 Authorization Header:", authHeader);

    if (authHeader && !authHeader.startsWith("Bearer ")) {
      throw new Error("Format d'autorisation invalide. Utilisez 'Bearer <token>'.");
    }
    
    const token = authHeader && authHeader.startsWith("Bearer ")
      ? authHeader.split(" ")[1] 
      : null;

    // const token = authHeader.replace("Bearer ", "");

    

    if (!token) {
      console.log("⚠️ Aucun token reçu");
      return { userId: null }; // Retourner `null` pour montrer qu'il n'y a pas d'auth
    }

    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET manquant dans les variables d'environnement.");
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      if (!decoded.userId) {
        throw new AuthenticationError("Token corrompu : userId manquant.");
      }
      console.log("✅ Token décodé :", decoded);
      return { userId: decoded.userId }; // Garder la cohérence avec `context.userId`
    } catch (error) {
      // console.error("❌ Token invalide :", error.message);
      // return { userId: null };
      // throw new Error("Token invalide ou expiré");
      throw new AuthenticationError("Token invalide ou expiré : " + error.message);
    }
  },
}).then(({ url }) => {
  console.log(`Server ready at ${url}`);
}).catch((err) => {
  console.error("❌ Error starting server:", err);
});
