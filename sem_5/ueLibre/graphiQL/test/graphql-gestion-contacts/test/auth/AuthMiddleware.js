
import { verifyToken } from "./AuthUtils.js";

export const authMiddleware = (resolver) => async (parent, args, context, info) => {
  const token = context.req.headers.authorization || "";
  
  // Vérifier si le token est valide
  const user = verifyToken(token.replace("Bearer ", ""));
  
  if (!user) throw new Error("Non authentifié !");
  
  // Ajouter l'utilisateur au contexte pour les résolveurs
  context.user = user;
  
  return resolver(parent, args, context, info);
};
