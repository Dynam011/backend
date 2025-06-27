import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

export const getAllPrograms = async () => {
  return await prisma.programs.findMany();
};

export const getProgramById = async (id) => {
  return await prisma.programs.findUnique({
    where: { id: Number(id) },
  });
};

export const createProgram = async (data) => {
  return await prisma.programs.create({
    data,
  });
};

export const updateProgram = async (id, data) => {
  return await prisma.programs.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteProgram = async (id) => {
  return await prisma.programs.delete({
    where: { id: Number(id) },
  });
};