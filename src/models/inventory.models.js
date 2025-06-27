import { PrismaClient } from '../generated/prisma/index.js';
export const prisma = new PrismaClient();

export const getAllInventory = async () => {
  return await prisma.inventory.findMany();
};

export const getInventoryById = async (id) => {
  return await prisma.inventory.findUnique({
    where: { id: Number(id) },
  });
};

export const createInventory = async (data) => {
  return await prisma.inventory.create({
    data,
  });
};

export const updateInventory = async (id, data) => {
  return await prisma.inventory.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteInventory = async (id) => {
  return await prisma.inventory.delete({
    where: { id: Number(id) },
  });
};