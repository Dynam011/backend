import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();


// Obtener todos los assessments
export const getAllAssessments = async () => {
  return prisma.assessment.findMany();
};

// Obtener un assessment por ID
export const getAssessmentById = async (id) => {
  return prisma.assessment.findUnique({
    where: { id: Number(id) },
  });
};

// Crear un assessment
export const createAssessment = async (data) => {
  return prisma.assessment.create({
    data,
  });
};

// Actualizar un assessment
export const updateAssessment = async (id, data) => {
  return prisma.assessment.update({
    where: { id: Number(id) },
    data,
  });
};

// Eliminar un assessment
export const deleteAssessment = async (id) => {
  return prisma.assessment.delete({
    where: { id: Number(id) },
  });
};