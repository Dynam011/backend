import { z } from "zod";
import {
  getAllSubjects,
  getSubjectById,
  createSubject as createSubjectModel,
  updateSubject as updateSubjectModel,
  deleteSubject as deleteSubjectModel,
} from "../models/subjects.models.js";
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

// Esquema Zod para crear/actualizar subject
const subjectSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  credits: z.number().int().min(1, { message: "Los créditos deben ser un número entero positivo" }),
  program_id: z.number({ message: "El programa es obligatorio" })
  // Agrega aquí otros campos según tu modelo de Prisma
});

export const getSubjects = async (req, res) => {
  try {
    const subjects = await getAllSubjects();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subjects", error: error.message });
  }
};

export const getSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await getSubjectById(Number(id));
    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }
    res.json(subject);
  } catch (error) {
    res.status(500).json({ message: "Error fetching subject", error: error.message });
  }
};

export const createSubject = async (req, res) => {
  const parsed = subjectSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const newSubject = await createSubjectModel(parsed.data);
    res.status(201).json(newSubject);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateSubject = async (req, res) => {
  const { id } = req.params;
  const parsed = subjectSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedSubject = await updateSubjectModel(Number(id), parsed.data);
    res.json(updatedSubject);
  } catch (error) {
    res.status(400).json({ message: "Error updating subject", error: error.message });
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteSubjectModel(Number(id));
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Subject not found" });
  }
};