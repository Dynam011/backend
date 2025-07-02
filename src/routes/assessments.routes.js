import { Router } from "express";
import { requireAdmin } from "../middlewares/adminRequired.js";
import {
  getAssessments,
  getAssessment,
  createAssessment,
  updateAssessment,
  deleteAssessment,
} from "../controllers/assessments.controllers.js";
import { authenticateToken } from "../middlewares/auth.js";

const router = Router();

// Assessment routes
router.get("/assessments", authenticateToken, getAssessments);
router.get("/assessments/:id", authenticateToken, getAssessment);
router.post("/assessments",requireAdmin, authenticateToken, createAssessment);
router.put("/assessments/:id",requireAdmin, authenticateToken, updateAssessment);
router.delete("/assessments/:id",requireAdmin, authenticateToken, deleteAssessment);

export default router;
