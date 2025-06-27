import { Router } from "express";
import {
  createInventory,
  deleteInventory,
  getInventory,
  getInventoryItem,
  updateInventory,
} from "../controllers/inventory.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/adminRequired.js";

const router = Router();

router.get("/inventory", authenticateToken, getInventory);

router.get("/inventory/:id", authenticateToken, getInventoryItem);

router.post("/inventory", requireAdmin, authenticateToken, createInventory);

router.delete("/inventory/:id", requireAdmin, authenticateToken, deleteInventory);

router.put("/inventory/:id", requireAdmin, authenticateToken, updateInventory);

export default router;