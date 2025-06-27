import { Router } from "express";
import {
  createProgram,
  deleteProgram,
  getProgram,
  getPrograms,
  updateProgram,
} from "../controllers/programs.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/adminRequired.js";

const router = Router();

router.get("/programs", authenticateToken, getPrograms);

router.get("/programs/:id", authenticateToken, getProgram);

router.post("/programs", requireAdmin, authenticateToken, createProgram);

router.delete("/programs/:id", requireAdmin, authenticateToken, deleteProgram);

router.put("/programs/:id", requireAdmin, authenticateToken, updateProgram);

export default router;