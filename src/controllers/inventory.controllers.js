import { z } from "zod";
import {
  getAllInventory,
  getInventoryById,
  createInventory as createInventoryModel,
  updateInventory as updateInventoryModel,
  deleteInventory as deleteInventoryModel,
} from "../models/inventory.models.js";
import { handlePrismaError } from '../utils/prismaErrorHandler.js';

// Esquema Zod para crear/actualizar inventario
const inventorySchema = z.object({
  name: z.string().min(2, { message: "El nombre debe tener al menos 2 caracteres" }),
  description: z.string().optional(),
  quantity: z.number().int().min(0, { message: "La cantidad debe ser un número entero positivo" }),
  location: z.string().optional(),
  status: z.string().optional(),
});

export const getInventory = async (req, res) => {
  try {
    const inventory = await getAllInventory();
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory", error: error.message });
  }
};

export const getInventoryItem = async (req, res) => {
  try {
    const { id } = req.params;
    const item = await getInventoryById(Number(id));
    if (!item) {
      return res.status(404).json({ message: "Inventory item not found" });
    }
    res.json(item);
  } catch (error) {
    res.status(500).json({ message: "Error fetching inventory item", error: error.message });
  }
};

export const createInventory = async (req, res) => {
  const parsed = inventorySchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Datos inválidos", errors: parsed.error.errors });
  }
  try {
    const newItem = await createInventoryModel(parsed.data);
    res.status(201).json(newItem);
  } catch (error) {
    handlePrismaError(error, res);
  }
};

export const updateInventory = async (req, res) => {
  const { id } = req.params;
  const parsed = inventorySchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: "Invalid data", errors: parsed.error.errors });
  }
  try {
    const updatedItem = await updateInventoryModel(Number(id), parsed.data);
    res.json(updatedItem);
  } catch (error) {
    res.status(400).json({ message: "Error updating inventory", error: error.message });
  }
};

export const deleteInventory = async (req, res) => {
  try {
    const { id } = req.params;
    await deleteInventoryModel(Number(id));
    res.sendStatus(204);
  } catch (error) {
    res.status(404).json({ message: "Inventory item not found" });
  }
};