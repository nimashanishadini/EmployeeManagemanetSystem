"use client"

import { useState, useEffect } from "react"
import { departmentAPI, employeeAPI } from "../services/api"
import toast from "react-hot-toast"
import { Plus, Edit, Trash2, Building2, Users, DollarSign } from "lucide-react"

const Departments = () => {
  const [departments, setDepartments] = useState([])
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [editingDepartment, setEditingDepartment] = useState(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    manager: "",
    budget: "",
    location: "",
    status: "Active",
  })

  useEffect(() => {
    fetchDepartments()
    fetchEmployees()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await departmentAPI.getAll()
      setDepartments(response.data)
    } catch (error) {
      toast.error("Error fetching departments")
    } finally {
      setLoading(false)
    }
  }

  const fetchEmployees = async () => {
    try {
      const response = await employeeAPI.getAll({ limit: 1000 })
      setEmployees(response.data.employees)
    } catch (error) {
      console.error("Error fetching employees:", error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDepartment) {
        await departmentAPI.update(editingDepartment._id, formData)
        toast.success("Department updated successfully")
      } else {
        await departmentAPI.create(formData)
        toast.success("Department created successfully")
      }

      setShowModal(false)
      setEditingDepartment(null)
      setFormData({
        name: "",
        description: "",
        manager: "",
        budget: "",
        location: "",
        status: "Active",
      })
      fetchDepartments()
    } catch (error) {
      toast.error(error.response?.data?.message || "Error saving department")
    }
  }

  const handleEdit = (department) => {
    setEditingDepartment(department)
    setFormData({
      name: department.name,
      description: department.description || "",
      manager: department.manager?._id || "",
      budget: department.budget || "",
      location: department.location || "",
      status: department.status,
    })
    setShowModal(true)
  }

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      try {
        await departmentAPI.delete(id)
        toast.success("Department deleted successfully")
        fetchDepartments()
      } catch (error) {
        toast.error(error.response?.data?.message || "Error deleting department")
      }
    }
  }

  const getEmployeeCount = (departmentId) => {
    return employees.filter((emp) => emp.department?._id === departmentId).length
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600">Manage your organization's departments</p>
        </div>
        <button onClick={() => setShowModal(true)} className="btn btn-primary flex items-center space-x-2">
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Departments Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((department) => (
          <div key={department._id} className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Building2 className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{department.name}</h3>
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        department.status === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                      }`}
                    >
                      {department.status}
                    </span>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button onClick={() => handleEdit(department)} className="text-indigo-600 hover:text-indigo-900">
                    <Edit className="h-4 w-4" />
                  </button>
                  <button onClick={() => handleDelete(department._id)} className="text-red-600 hover:text-red-900">
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {department.description && <p className="text-gray-600 text-sm mb-4">{department.description}</p>}

              <div className="space-y-3">
                <div className="flex items-center text-sm text-gray-600">
                  <Users className="h-4 w-4 mr-2" />
                  <span>{getEmployeeCount(department._id)} employees</span>
                </div>

                {department.manager && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span>
                      Manager: {department.manager.firstName} {department.manager.lastName}
                    </span>
                  </div>
                )}

                {department.budget > 0 && (
                  <div className="flex items-center text-sm text-gray-600">
                    <DollarSign className="h-4 w-4 mr-2" />
                    <span>Budget: ${department.budget.toLocaleString()}</span>
                  </div>
                )}

                {department.location && (
                  <div className="flex items-center text-sm text-gray-600">
                    <Building2 className="h-4 w-4 mr-2" />
                    <span>{department.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {departments.length === 0 && (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No departments found. Create your first department!</p>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
          <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
            <div className="mt-3">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                {editingDepartment ? "Edit Department" : "Add New Department"}
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Department Name *</label>
                  <input
                    type="text"
                    required
                    className="input"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                  <textarea
                    className="input"
                    rows="3"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Manager</label>
                  <select
                    className="input"
                    value={formData.manager}
                    onChange={(e) => setFormData({ ...formData, manager: e.target.value })}
                  >
                    <option value="">Select Manager</option>
                    {employees.map((employee) => (
                      <option key={employee._id} value={employee._id}>
                        {employee.firstName} {employee.lastName}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
                  <input
                    type="number"
                    className="input"
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                  <input
                    type="text"
                    className="input"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                  <select
                    className="input"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setEditingDepartment(null)
                      setFormData({
                        name: "",
                        description: "",
                        manager: "",
                        budget: "",
                        location: "",
                        status: "Active",
                      })
                    }}
                    className="btn btn-secondary"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    {editingDepartment ? "Update" : "Create"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Departments
