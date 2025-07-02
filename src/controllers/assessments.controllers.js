import { z } from "zod";
import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();
import { handlePrismaError } from "../utils/prismaErrorHandler.js";

// Esquema Zod para crear/actualizar assessment
const assessmentSchema = z.object({
  section_id: z.number({ required_error: "section_id es requerido" }),
  name: z.string().min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
  description: z.string().optional(),
  due_date: z.string({ required_error: "due_date es requerido" }), // ISO string
  max_score: z.number({ required_error: "max_score es requerido" }),
});

// Obtener todos los assessments
export const getAssessments = async (req, res) => {
  try {
    const assessments = await prisma.assessments.findMany();
    res.json(assessments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener assessments", error: error.message });
  }
};

// Obtener un assessment por ID
export const getAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    const assessment = await prisma.assessments.findUnique({ where: { id: Number(id) } });
    if (!assessment) {
      return res.status(404).json({ message: "Assessment no encontrado" });
    }
    res.json(assessment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener assessment", error: error.message });
  }
};

// Crear un assessment
export const createAssessment = async (req, res) => {
  const parsed = assessmentSchema.safeParse(req.body);
  if (!parsed.success) {
    const mensajes = parsed.error.errors.map(e => e.message);
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const newAssessment = await prisma.assessments.create({
      data: parsed.data,
    });
    res.status(201).json(newAssessment);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

// Actualizar un assessment
export const updateAssessment = async (req, res) => {
  const { id } = req.params;
  const parsed = assessmentSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    const mensajes = parsed.error.errors.map(e => e.message);
    return res.status(400).json({ message: "Datos inválidos", errors: mensajes });
  }
  try {
    const updatedAssessment = await prisma.assessments.update({
      where: { id: Number(id) },
      data: parsed.data,
    });
    res.json(updatedAssessment);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

// Eliminar un assessment
export const deleteAssessment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.assessments.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: "Assessment eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: "Assessment no encontrado" });
  }
  }