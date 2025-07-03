import { z } from "zod";
import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();
import { handlePrismaError } from "../utils/prismaErrorHandler.js";

// Esquema Zod para crear/actualizar enrollment
const enrollmentSchema = z.object({
  student_id: z.number({ required_error: "student_id es requerido" }),
  section_id: z.number({ required_error: "section_id es requerido" }),
  enrollment_date: z.string({ required_error: "enrollment_date es requerido" }), // ISO string
  status: z.string().optional(),
  payment_status: z.string().optional(),
});

// Obtener todos los enrollments
export const getEnrollments = async (req, res) => {
  try {
    const enrollments = await prisma.enrollments.findMany();
    res.json(enrollments);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener enrollments", error: error.message });
  }
};

// Obtener un enrollment por ID
export const getEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    const enrollment = await prisma.enrollments.findUnique({ where: { id: Number(id) } });
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment no encontrado" });
    }
    res.json(enrollment);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener enrollment", error: error.message });
  }
};

// Crear un enrollment
export const createEnrollment = async (req, res) => {
  const parsed = enrollmentSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const newEnrollment = await prisma.enrollments.create({
      data: parsed.data,
    });
    res.status(201).json(newEnrollment);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

// Actualizar un enrollment
export const updateEnrollment = async (req, res) => {
  const { id } = req.params;
  const parsed = enrollmentSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const updatedEnrollment = await prisma.enrollments.update({
      where: { id: Number(id) },
      data: parsed.data,
    });
    res.json(updatedEnrollment);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

// Eliminar un enrollment
export const deleteEnrollment = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.enrollments.delete({ where: { id: Number(id) } });
    res.status(204).json({ message: "Enrollment eliminado correctamente" });
  } catch (error) {
    res.status(404).json({ message: "Enrollment no encontrado" });
  }
};