import { z } from "zod";
import {
  getAllPrograms,
  getProgramById,
  createProgram as createProgramModel,
  updateProgram as updateProgramModel,
  deleteProgram as deleteProgramModel,
} from "../models/programs.models.js";
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

// Esquema Zod para crear/actualizar programa
const programSchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  status: z.string().optional(),
  
  // Agrega aquí otros campos según tu modelo de Prisma
});

export const getPrograms = async (req, res) => {
  try {
    const programs = await getAllPrograms();
    res.json(programs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching programs", error: error.message });
  }
};

export const getProgram = async (req, res) => {
  try {
    const { id } = req.params;
    const program = await getProgramById(Number(id));
    if (!program) {
      return res.status(404).json({ message: "Program not found" });
    }
    res.json(program);
  } catch (error) {
    res.status(500).json({ message: "Error fetching program", error: error.message });
  }
};

export const createProgram = async (req, res) => {
  const parsed = programSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const newProgram = await createProgramModel(parsed.data);
    res.status(201).json(newProgram);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateProgram = async (req, res) => {
  const { id } = req.params;
  const parsed = programSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedProgram = await updateProgramModel(Number(id), parsed.data);
    res.json(updatedProgram);
  } catch (error) {
    res.status(400).json({ message: "Error updating program", error: error.message });
  }
};

export const deleteProgram = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteProgramModel(Number(id));
    res.sendStatus(204);
  } catch (error) {
    console.log("Error deleting program:", error);
    res.status(404).json({ message: "Program not found" });
  }
};