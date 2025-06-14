import express from "express"
import {
  getAllDepartments,
  getDepartments,
  createDepartment,
  updateDepartment,
  deleteDepartment,
} from "../controllers/departmentController.js"
import { authenticateToken } from "../middleware/auth.js"

const router = express.Router()

// Apply authentication middleware to all routes
router.use(authenticateToken)

router.get("/", getAllDepartments)
router.get("/", getDepartments)
router.post("/", createDepartment)
router.put("/:id", updateDepartment)
router.delete("/:id", deleteDepartment)



export default router
