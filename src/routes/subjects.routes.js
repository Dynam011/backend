import { Router } from "express";
import {
  createSubject,
  deleteSubject,
  getSubject,
  getSubjects,
  updateSubject,
} from "../controllers/subjects.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";
import { requireAdmin } from "../middlewares/adminRequired.js";

const router = Router();

router.get("/subjects", authenticateToken, getSubjects);

router.get("/subjects/:id", authenticateToken, getSubject);

router.post("/subjects", requireAdmin, authenticateToken, createSubject);

router.delete("/subjects/:id", requireAdmin, authenticateToken, deleteSubject);

router.put("/subjects/:id", requireAdmin, authenticateToken, updateSubject);

export default router;