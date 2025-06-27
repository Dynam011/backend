import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

export const getAllSubjects = async () => {
  return await prisma.subjects.findMany();
};

export const getSubjectById = async (id) => {
  return await prisma.subjects.findUnique({
    where: { id: Number(id) },
  });
};

export const createSubject = async (data) => {
  return await prisma.subjects.create({
    data,
  });
};

export const updateSubject = async (id, data) => {
  return await prisma.subjects.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteSubject = async (id) => {
  return await prisma.subjects.delete({
    where: { id: Number(id) },
  });
};