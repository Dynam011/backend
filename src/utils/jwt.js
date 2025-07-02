import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET; // Usa una variable de entorno en producción

export function generateToken(payload, expiresIn = "1h") {
  return jwt.sign(payload, JWT_SECRET, { expiresIn });
}

export function verifyToken(token) {
  return jwt.verify(token, JWT_SECRET);
}
