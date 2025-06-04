"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { useForm } from "react-hook-form"
import { employeeAPI, departmentAPI } from "../services/api"
import toast from "react-hot-toast"
import { ArrowLeft, Save } from "lucide-react"

const EditEmployee = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm()

  useEffect(() => {
    fetchEmployee()
    fetchDepartments()
  }, [id])

  const fetchEmployee = async () => {
    try {
      const response = await employeeAPI.getById(id)
      const employee = response.data

      // Format dates for input fields
      const formattedEmployee = {
        ...employee,
        dateOfBirth: employee.dateOfBirth ? new Date(employee.dateOfBirth).toISOString().split("T")[0] : "",
        dateOfJoining: employee.dateOfJoining ? new Date(employee.dateOfJoining).toISOString().split("T")[0] : "",
        department: employee.department?._id || "",
      }

      reset(formattedEmployee)
    } catch (error) {
      toast.error("Error fetching employee data")
      navigate("/employees")
    } finally {
      setInitialLoading(false)
    }
  }

  const fetchDepartments = async () => {
    try {
      const response = await departmentAPI.getAll()
      setDepartments(response.data)
    } catch (error) {
      toast.error("Error fetching departments")
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      await employeeAPI.update(id, data)
      toast.success("Employee updated successfully")
      navigate("/employees")
    } catch (error) {
      toast.error(error.response?.data?.message || "Error updating employee")
    } finally {
      setLoading(false)
    }
  }

  if (initialLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <button onClick={() => navigate("/employees")} className="flex items-center text-gray-600 hover:text-gray-800">
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Employees
        </button>
        <h1 className="text-3xl font-bold text-gray-900">Edit Employee</h1>
      </div>

      <div className="bg-white rounded-lg shadow">
        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          {/* Personal Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
                <input
                  type="text"
                  className="input"
                  {...register("firstName", { required: "First name is required" })}
                />
                {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
                <input type="text" className="input" {...register("lastName", { required: "Last name is required" })} />
                {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  className="input"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Invalid email address",
                    },
                  })}
                />
                {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                <input type="tel" className="input" {...register("phone", { required: "Phone is required" })} />
                {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
                <input
                  type="date"
                  className="input"
                  {...register("dateOfBirth", { required: "Date of birth is required" })}
                />
                {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Date of Joining *</label>
                <input
                  type="date"
                  className="input"
                  {...register("dateOfJoining", { required: "Date of joining is required" })}
                />
                {errors.dateOfJoining && <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining.message}</p>}
              </div>
            </div>
          </div>

          {/* Work Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Work Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
                <select className="input" {...register("department", { required: "Department is required" })}>
                  <option value="">Select Department</option>
                  {departments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
                <input type="text" className="input" {...register("position", { required: "Position is required" })} />
                {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
                <input
                  type="number"
                  className="input"
                  {...register("salary", {
                    required: "Salary is required",
                    min: { value: 0, message: "Salary must be positive" },
                  })}
                />
                {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                <select className="input" {...register("status")}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                  <option value="Terminated">Terminated</option>
                </select>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Address Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
                <input type="text" className="input" {...register("address.street")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                <input type="text" className="input" {...register("address.city")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
                <input type="text" className="input" {...register("address.state")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
                <input type="text" className="input" {...register("address.zipCode")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                <input type="text" className="input" {...register("address.country")} />
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div>
            <h2 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                <input type="text" className="input" {...register("emergencyContact.name")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                <input type="text" className="input" {...register("emergencyContact.relationship")} />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                <input type="tel" className="input" {...register("emergencyContact.phone")} />
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button type="button" onClick={() => navigate("/employees")} className="btn btn-secondary">
              Cancel
            </button>
            <button type="submit" disabled={loading} className="btn btn-primary flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>{loading ? "Updating..." : "Update Employee"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmployee
