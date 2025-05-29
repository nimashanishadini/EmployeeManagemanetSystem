import Department from "../models/Department.js"
import Employee from "../models/Employee.js"

// Get all departments
export const getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find().populate("manager", "firstName lastName")
    res.json(departments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get department by ID
export const getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.id).populate("manager", "firstName lastName")

    if (!department) {
      return res.status(404).json({ message: "Department not found" })
    }

    res.json(department)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create new department
export const createDepartment = async (req, res) => {
  try {
    const department = new Department(req.body)
    const savedDepartment = await department.save()
    const populatedDepartment = await Department.findById(savedDepartment._id).populate("manager", "firstName lastName")

    res.status(201).json(populatedDepartment)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Department with this name already exists" })
    } else {
      res.status(400).json({ message: error.message })
    }
  }
}

// Update department
export const updateDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("manager", "firstName lastName")

    if (!department) {
      return res.status(404).json({ message: "Department not found" })
    }

    res.json(department)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete department
export const deleteDepartment = async (req, res) => {
  try {
    // Check if department has employees
    const employeeCount = await Employee.countDocuments({ department: req.params.id })

    if (employeeCount > 0) {
      return res.status(400).json({
        message: `Cannot delete department. It has ${employeeCount} employee(s) assigned.`,
      })
    }

    const department = await Department.findByIdAndDelete(req.params.id)

    if (!department) {
      return res.status(404).json({ message: "Department not found" })
    }

    res.json({ message: "Department deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
