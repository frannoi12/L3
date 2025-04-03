import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const SECRET_KEY = process.env.JWT_SECRET || "";

// Hashage du mot de passe
export const hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};

// Vérification du mot de passe
export const verifyPassword = async (password, hashedPassword) => {
  return await bcrypt.compare(password, hashedPassword);
};

// Génération du token JWT
export const generateToken = (user) => {
  return jwt.sign({ id: user.id, email: user.email }, SECRET_KEY, { expiresIn: "1h" });
};

// Vérification du token JWT
export const verifyToken = (token) => {
  try {
    return jwt.verify(token, SECRET_KEY);
  } catch (error) {
    throw new Error("Token invalide ou expiré");
  }
};

