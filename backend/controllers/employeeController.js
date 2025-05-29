import Employee from "../models/Employee.js"

// Get all employees
export const getAllEmployees = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", department = "", status = "" } = req.query

    const query = {}

    // Search functionality
    if (search) {
      query.$or = [
        { firstName: { $regex: search, $options: "i" } },
        { lastName: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { employeeId: { $regex: search, $options: "i" } },
      ]
    }

    // Filter by department
    if (department) {
      query.department = department
    }

    // Filter by status
    if (status) {
      query.status = status
    }

    const employees = await Employee.find(query)
      .populate("department", "name")
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 })

    const total = await Employee.countDocuments(query)

    res.json({
      employees,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get employee by ID
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate("department")

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.json(employee)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Create new employee
export const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body)
    const savedEmployee = await employee.save()
    const populatedEmployee = await Employee.findById(savedEmployee._id).populate("department")

    res.status(201).json(populatedEmployee)
  } catch (error) {
    if (error.code === 11000) {
      res.status(400).json({ message: "Employee with this email already exists" })
    } else {
      res.status(400).json({ message: error.message })
    }
  }
}

// Update employee
export const updateEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("department")

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.json(employee)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Delete employee
export const deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id)

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" })
    }

    res.json({ message: "Employee deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get employee statistics
export const getEmployeeStats = async (req, res) => {
  try {
    const totalEmployees = await Employee.countDocuments()
    const activeEmployees = await Employee.countDocuments({ status: "Active" })
    const inactiveEmployees = await Employee.countDocuments({ status: "Inactive" })

    const departmentStats = await Employee.aggregate([
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      {
        $lookup: {
          from: "departments",
          localField: "_id",
          foreignField: "_id",
          as: "department",
        },
      },
      {
        $unwind: "$department",
      },
      {
        $project: {
          departmentName: "$department.name",
          count: 1,
        },
      },
    ])

    res.json({
      totalEmployees,
      activeEmployees,
      inactiveEmployees,
      departmentStats,
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}
