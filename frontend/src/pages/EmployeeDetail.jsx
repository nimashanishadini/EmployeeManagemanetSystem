"use client"

import { useState, useEffect } from "react"
import { useNavigate, useParams, Link } from "react-router-dom"
import { employeeAPI } from "../services/api"
import toast from "react-hot-toast"
import { ArrowLeft, Edit, Mail, Phone, MapPin, Building2, DollarSign, User, Users } from "lucide-react"

const EmployeeDetail = () => {
  const navigate = useNavigate()
  const { id } = useParams()
  const [employee, setEmployee] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchEmployee()
  }, [id])

  const fetchEmployee = async () => {
    try {
      const response = await employeeAPI.getById(id)
      setEmployee(response.data)
    } catch (error) {
      toast.error("Error fetching employee data")
      navigate("/employees")
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  if (!employee) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">Employee not found</p>
      </div>
    )
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate("/employees")}
            className="flex items-center text-gray-600 hover:text-gray-800"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Employees
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Employee Details</h1>
        </div>
        <Link to={`/employees/edit/${employee._id}`} className="btn btn-primary flex items-center space-x-2">
          <Edit className="h-4 w-4" />
          <span>Edit Employee</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Employee Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="text-center">
              <div className="h-24 w-24 rounded-full bg-gray-300 flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-medium text-gray-700">
                  {employee.firstName[0]}
                  {employee.lastName[0]}
                </span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">
                {employee.firstName} {employee.lastName}
              </h2>
              <p className="text-gray-600">{employee.position}</p>
              <p className="text-sm text-gray-500">{employee.employeeId}</p>

              <div className="mt-4">
                <span
                  className={`inline-flex px-3 py-1 text-sm font-semibold rounded-full ${
                    employee.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : employee.status === "Inactive"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {employee.status}
                </span>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{employee.email}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{employee.phone}</span>
              </div>
              <div className="flex items-center space-x-3">
                <Building2 className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">{employee.department?.name || "N/A"}</span>
              </div>
              <div className="flex items-center space-x-3">
                <DollarSign className="h-5 w-5 text-gray-400" />
                <span className="text-gray-900">${employee.salary.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Employee Details */}
        <div className="lg:col-span-2 space-y-6">
          {/* Personal Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <User className="h-5 w-5 mr-2" />
                Personal Information
              </h3>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date of Birth</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {employee.dateOfBirth ? formatDate(employee.dateOfBirth) : "N/A"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-500">Date of Joining</label>
                  <p className="mt-1 text-sm text-gray-900">
                    {employee.dateOfJoining ? formatDate(employee.dateOfJoining) : "N/A"}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Address Information */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Address Information
              </h3>
            </div>
            <div className="p-6">
              {employee.address && (employee.address.street || employee.address.city || employee.address.state) ? (
                <div className="space-y-2">
                  {employee.address.street && <p className="text-sm text-gray-900">{employee.address.street}</p>}
                  <p className="text-sm text-gray-900">
                    {[employee.address.city, employee.address.state, employee.address.zipCode]
                      .filter(Boolean)
                      .join(", ")}
                  </p>
                  {employee.address.country && <p className="text-sm text-gray-900">{employee.address.country}</p>}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No address information available</p>
              )}
            </div>
          </div>

          {/* Emergency Contact */}
          <div className="bg-white rounded-lg shadow">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900 flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Emergency Contact
              </h3>
            </div>
            <div className="p-6">
              {employee.emergencyContact && employee.emergencyContact.name ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Name</label>
                    <p className="mt-1 text-sm text-gray-900">{employee.emergencyContact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Relationship</label>
                    <p className="mt-1 text-sm text-gray-900">{employee.emergencyContact.relationship || "N/A"}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-500">Phone</label>
                    <p className="mt-1 text-sm text-gray-900">{employee.emergencyContact.phone || "N/A"}</p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-500">No emergency contact information available</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployeeDetail
