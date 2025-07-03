import { verifyToken } from "../utils/jwt.js";

export function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];
  console.log(token)
  if (!token) return res.status(401).json({ 
   
    message: "Token requerido" });
    

  try {
    const payload = verifyToken(token);
    req.user = payload;
    next();
  } catch (error) {
    res.status(403).json({ message: "Token inválido o expirado" });
  }
}
