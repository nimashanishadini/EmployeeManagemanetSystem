import express from "express"
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeStats,
} from "../controllers/employeeController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

router.get("/", getAllEmployees)
router.get("/stats", getEmployeeStats)
router.get("/:id", getEmployeeById)
router.post("/", createEmployee)
router.put("/:id", updateEmployee)
router.delete("/:id", deleteEmployee)

export default router
