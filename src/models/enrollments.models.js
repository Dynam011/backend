import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

// Obtener todos los enrollments
export const getAllEnrollments = async () => {
  return await prisma.enrollments.findMany();
};

// Obtener un enrollment por ID
export const getEnrollmentById = async (id) => {
  return await prisma.enrollments.findUnique({
    where: { id: Number(id) },
  });
};

// Crear un enrollment
export const createEnrollment = async (data) => {
  return await prisma.enrollments.create({
    data,
  });
};

// Actualizar un enrollment
export const updateEnrollment = async (id, data) => {
  return await prisma.enrollments.update({
    where: { id: Number(id) },
    data,
  });
};

// Eliminar un enrollment
export const deleteEnrollment = async (id) => {
  return await prisma.enrollments.delete({
    where: { id: Number(id) },
  });
};