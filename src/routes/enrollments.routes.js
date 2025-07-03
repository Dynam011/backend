import { Router } from "express";
import { requireAdmin } from "../middlewares/adminRequired.js";
import { authenticateToken } from "../middlewares/auth.js";
import {
  getEnrollments,
  getEnrollment,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
} from "../controllers/enrollments.controller.js";

const router = Router();

// Enrollment routes
router.get("/enrollments", authenticateToken, getEnrollments);
router.get("/enrollments/:id", authenticateToken, getEnrollment);
router.post("/enrollments", requireAdmin, authenticateToken, createEnrollment);
router.put("/enrollments/:id", requireAdmin, authenticateToken, updateEnrollment);
router.delete("/enrollments/:id", requireAdmin, authenticateToken, deleteEnrollment);

export default router;