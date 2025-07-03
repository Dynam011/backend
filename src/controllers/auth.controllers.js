import { z } from "zod";
import { findUserByEmail } from "../models/auth.models.js";
import bcrypt from "bcryptjs"; // o bcrypt
// Si usas JWT:
import jwt from "jsonwebtoken";

// Esquema Zod para login
const loginSchema = z.object({
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const login = async (req, res) => {
  const parsed = loginSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }

  const { email, password } = parsed.data;

  try {
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    const validPassword = await bcrypt.compare(password, user.password_hash);
    if (!validPassword) {
      return res.status(401).json({ message: "Credenciales incorrectas" });
    }

    // Si usas JWT:
    const token = jwt.sign(
      { userId: user.id, role: user.role_id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login exitoso",
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.first_name,
        last_name: user.last_name,
        phone: user.phone,
        role_id: user.role_id,
        // ...otros campos públicos
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error en el login", error: error.message });
  }
};