import { z } from "zod";
import {
  getAllUsers,
  getUserById,
  createUser as createUserModel,
  updateUser as updateUserModel,
  deleteUser as deleteUserModel,
} from "../models/users.models.js";
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

// Esquema Zod para crear usuario
const userSchema = z.object({
  first_name: z
    .string()
    .min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  last_name: z
    .string()
    .min(2, { message: "El apellido debe tener al menos 2 caracteres" }),
  phone: z.string().optional(),
  address: z.string().optional(),
  birthdate: z.string().optional(),
  email: z.string().email({ message: "El correo electrónico no es válido" }),
  password_hash: z
    .string()
    .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  role_id: z.number({
    invalid_type_error: "El rol es obligatorio y debe ser un número",
  }),
  status: z.string().optional(),
});

export const getUsers = async (req, res) => {
  try {
    const users = await getAllUsers();
    // Solo datos básicos, excluyendo password y datos sensibles
    const publicUsers = users.map(user => ({
      id: user.id,
      first_name: user.first_name,
      last_name: user.last_name,
      phone: user.phone,
      email: user.email,
      role_id: user.role_id,
      status: user.status,
      // Agrega aquí otros campos públicos si lo deseas
    }));
    res.json(publicUsers);
  } catch (error) {
    res.status(500).json({ message: "Error fetching users", error: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    // Excluye la contraseña y datos privados
    const publicUser  = user;
    res.json({
      id: publicUser.id,
      first_name: publicUser.first_name,
      last_name: publicUser.last_name,
      email: publicUser.email,
      role_id: publicUser.role_id,
      status: publicUser.status,
      // Agrega aquí otros campos públicos si lo deseas
    });
  } catch (error) {
    res.status(500).json({ message: "Error fetching user", error: error.message });
  }
};

export const createUser = async (req, res) => {
  const parsed = userSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const newUser = await createUserModel(parsed.data);
    res.status(201).json(newUser);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const parsed = userSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res
      .status(400)
      .json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedUser = await updateUserModel(id, parsed.data);
    res.json(updatedUser);
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error updating user", error: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteUserModel(id);
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "User not found" });
  }
};
