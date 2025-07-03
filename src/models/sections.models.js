import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

// Obtener todas las secciones
export const getAllSections = async () => {
  return prisma.sections.findMany();
};

// Obtener una sección por ID
export const getSectionById =  (id) => {
   return prisma.sections.findUnique({
    where: { id: Number(id) },
  });
};

// Crear una nueva sección
export const createSection =  (section) => {
   return prisma.sections.create({
    data: section,
  });
};

// Actualizar una sección
export const updateSection =  (id, section) => {
   return prisma.sections.update({
    where: { id: Number(id) },
    data: section,
  });
};

// Eliminar una sección
export const deleteSection =  (id) => {
   return prisma.sections.delete({
    where: { id: Number(id) },
  });
};