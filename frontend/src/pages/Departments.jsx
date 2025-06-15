// "use client"

// import { useState, useEffect } from "react"
// import axios from "axios"
// import toast from "react-hot-toast"
// import { Plus, Edit, Trash2, Search, Loader2, AlertCircle } from "lucide-react"

// const Departments = () => {
//   const [showModal, setShowModal] = useState(false)
//   const [departments, setDepartments] = useState([])
//   const [loading, setLoading] = useState(true)
//   const [submitting, setSubmitting] = useState(false)
//   const [editingDept, setEditingDept] = useState(null)
//   const [searchTerm, setSearchTerm] = useState("")
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
//   const [formData, setFormData] = useState({
//     name: "",
//     description: "",
//     budget: "",
//     location: "",
//     status: "Active",
//   })

//   // Reset form data
//   const resetForm = () => {
//     setFormData({
//       name: "",
//       description: "",
//       budget: "",
//       location: "",
//       status: "Active",
//     })
//     setEditingDept(null)
//   }

//   // Fetch departments on load
//   const fetchDepartments = async () => {
//     try {
//       setLoading(true)
//       const response = await axios.get("http://localhost:5000/api/departments", {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       setDepartments(response.data)
//     } catch (error) {
//       console.error("Fetch departments error:", error)
//       toast.error("Failed to load departments")
//     } finally {
//       setLoading(false)
//     }
//   }

//   useEffect(() => {
//     fetchDepartments()
//   }, [])

//   // Handle form submit (create or update)
//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     setSubmitting(true)
    
//     try {
//       if (editingDept) {
//         // Update existing department
//         await axios.put(
//           `http://localhost:5000/api/departments/${editingDept._id || editingDept.id}`,
//           formData,
//           {
//             headers: {
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//           }
//         )
//         toast.success("Department updated successfully")
//       } else {
//         // Create new department
//         await axios.post("http://localhost:5000/api/departments", formData, {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         })
//         toast.success("Department created successfully")
//       }
      
//       setShowModal(false)
//       resetForm()
//       fetchDepartments()
//     } catch (error) {
//       console.error("Submit error:", error)
//       const message =
//         error?.response?.data?.message ||
//         error?.response?.statusText ||
//         `Failed to ${editingDept ? 'update' : 'create'} department`
//       toast.error(message)
//     } finally {
//       setSubmitting(false)
//     }
//   }

//   // Handle edit department
//   const handleEdit = (dept) => {
//     setFormData({
//       name: dept.name,
//       description: dept.description || "",
//       budget: dept.budget || "",
//       location: dept.location || "",
//       status: dept.status || "Active",
//     })
//     setEditingDept(dept)
//     setShowModal(true)
//   }

//   // Handle delete department
//   const handleDelete = async (deptId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/departments/${deptId}`, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//       })
//       toast.success("Department deleted successfully")
//       setShowDeleteConfirm(null)
//       fetchDepartments()
//     } catch (error) {
//       console.error("Delete error:", error)
//       const message =
//         error?.response?.data?.message ||
//         error?.response?.statusText ||
//         "Failed to delete department"
//       toast.error(message)
//     }
//   }

//   // Handle modal open for new department
//   const handleAddNew = () => {
//     resetForm()
//     setShowModal(true)
//   }

//   // Handle modal close
//   const handleCloseModal = () => {
//     setShowModal(false)
//     resetForm()
//   }

//   // Filter departments based on search
//   const filteredDepartments = departments.filter(dept =>
//     dept.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     dept.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//     dept.location?.toLowerCase().includes(searchTerm.toLowerCase())
//   )

//   // Format currency
//   const formatCurrency = (amount) => {
//     if (!amount) return '-'
//     return new Intl.NumberFormat('en-US', {
//       style: 'currency',
//       currency: 'USD'
//     }).format(amount)
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-7xl mx-auto space-y-6">
//         {/* Header */}
//         <div className="bg-white rounded-lg shadow-sm p-6">
//           <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//             <div>
//               <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
//               <p className="text-gray-600 mt-1">Manage your organization's departments</p>
//             </div>
//             <button
//               onClick={handleAddNew}
//               className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center space-x-2 hover:bg-blue-700 transition-colors shadow-sm"
//             >
//               <Plus className="h-4 w-4" />
//               <span>Add Department</span>
//             </button>
//           </div>
//         </div>

//         {/* Search and Filters */}
//         <div className="bg-white rounded-lg shadow-sm p-4">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
//               <input
//                 type="text"
//                 placeholder="Search departments..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//               />
//             </div>
//             <div className="text-sm text-gray-500 flex items-center">
//               {filteredDepartments.length} of {departments.length} departments
//             </div>
//           </div>
//         </div>

//         {/* Department List */}
//         <div className="bg-white rounded-lg shadow-sm overflow-hidden">
//           <div className="px-6 py-4 border-b border-gray-200">
//             <h2 className="text-xl font-semibold text-gray-900">All Departments</h2>
//           </div>

//           {loading ? (
//             <div className="flex items-center justify-center py-12">
//               <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
//               <span className="ml-2 text-gray-600">Loading departments...</span>
//             </div>
//           ) : filteredDepartments.length === 0 ? (
//             <div className="flex flex-col items-center justify-center py-12">
//               <AlertCircle className="h-12 w-12 text-gray-400 mb-4" />
//               <h3 className="text-lg font-medium text-gray-900 mb-2">
//                 {searchTerm ? 'No departments found' : 'No departments yet'}
//               </h3>
//               <p className="text-gray-500 text-center max-w-sm">
//                 {searchTerm 
//                   ? 'Try adjusting your search terms to find what you\'re looking for.'
//                   : 'Get started by creating your first department.'
//                 }
//               </p>
//               {!searchTerm && (
//                 <button
//                   onClick={handleAddNew}
//                   className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
//                 >
//                   Add Department
//                 </button>
//               )}
//             </div>
//           ) : (
//             <div className="overflow-x-auto">
//               <table className="min-w-full divide-y divide-gray-200">
//                 <thead className="bg-gray-50">
//                   <tr>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Name
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Description
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Budget
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Location
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Status
//                     </th>
//                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                       Actions
//                     </th>
//                   </tr>
//                 </thead>
//                 <tbody className="bg-white divide-y divide-gray-200">
//                   {filteredDepartments.map((dept) => (
//                     <tr key={dept._id || dept.id} className="hover:bg-gray-50">
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm font-medium text-gray-900">{dept.name}</div>
//                       </td>
//                       <td className="px-6 py-4">
//                         <div className="text-sm text-gray-900 max-w-xs truncate">
//                           {dept.description || '-'}
//                         </div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{formatCurrency(dept.budget)}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <div className="text-sm text-gray-900">{dept.location || '-'}</div>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap">
//                         <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
//                           dept.status === 'Active' 
//                             ? 'bg-green-100 text-green-800' 
//                             : 'bg-red-100 text-red-800'
//                         }`}>
//                           {dept.status}
//                         </span>
//                       </td>
//                       <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                         <div className="flex space-x-2">
//                           <button
//                             onClick={() => handleEdit(dept)}
//                             className="text-blue-600 hover:text-blue-900 p-1 rounded hover:bg-blue-100 transition-colors"
//                             title="Edit department"
//                           >
//                             <Edit className="h-4 w-4" />
//                           </button>
//                           <button
//                             onClick={() => setShowDeleteConfirm(dept._id || dept.id)}
//                             className="text-red-600 hover:text-red-900 p-1 rounded hover:bg-red-100 transition-colors"
//                             title="Delete department"
//                           >
//                             <Trash2 className="h-4 w-4" />
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
//             <div className="px-6 py-4 border-b border-gray-200">
//               <h3 className="text-lg font-semibold text-gray-900">
//                 {editingDept ? 'Edit Department' : 'Add New Department'}
//               </h3>
//             </div>
//             <form onSubmit={handleSubmit} className="p-6 space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name <span className="text-red-500">*</span>
//                 </label>
//                 <input
//                   required
//                   type="text"
//                   value={formData.name}
//                   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter department name"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
//                 <textarea
//                   rows="3"
//                   value={formData.description}
//                   onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter department description"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Budget</label>
//                 <input
//                   type="number"
//                   min="0"
//                   step="0.01"
//                   value={formData.budget}
//                   onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter budget amount"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
//                 <input
//                   type="text"
//                   value={formData.location}
//                   onChange={(e) => setFormData({ ...formData, location: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                   placeholder="Enter location"
//                 />
//               </div>
              
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
//                 <select
//                   value={formData.status}
//                   onChange={(e) => setFormData({ ...formData, status: e.target.value })}
//                   className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 >
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                 </select>
//               </div>
              
//               <div className="flex justify-end space-x-3 pt-6">
//                 <button
//                   type="button"
//                   onClick={handleCloseModal}
//                   disabled={submitting}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   disabled={submitting}
//                   className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center space-x-2"
//                 >
//                   {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
//                   <span>{editingDept ? 'Update' : 'Create'}</span>
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirmation Modal */}
//       {showDeleteConfirm && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg w-full max-w-md shadow-xl">
//             <div className="p-6">
//               <div className="flex items-center mb-4">
//                 <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100">
//                   <AlertCircle className="h-6 w-6 text-red-600" />
//                 </div>
//               </div>
//               <div className="text-center">
//                 <h3 className="text-lg font-medium text-gray-900 mb-2">Delete Department</h3>
//                 <p className="text-sm text-gray-500 mb-6">
//                   Are you sure you want to delete this department? This action cannot be undone.
//                 </p>
//               </div>
//               <div className="flex justify-end space-x-3">
//                 <button
//                   onClick={() => setShowDeleteConfirm(null)}
//                   className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={() => handleDelete(showDeleteConfirm)}
//                   className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   )
// }

// export default Departments


"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import toast from "react-hot-toast"
import { Plus, Trash2 } from "lucide-react"

const Departments = () => {
  const [showModal, setShowModal] = useState(false)
  const [departments, setDepartments] = useState([])
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    budget: "",
    location: "",
    status: "Active",
  })

  // ✅ Fetch all departments
  const fetchDepartments = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/departments", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      setDepartments(response.data)
    } catch (error) {
      console.error("Fetch error:", error)
      toast.error("Failed to fetch departments")
    }
  }

  useEffect(() => {
    fetchDepartments()
  }, [])

  // ✅ Submit new department
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await axios.post("http://localhost:5000/api/departments", formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      toast.success("Department created successfully")
      setShowModal(false)
      setFormData({
        name: "",
        description: "",
        budget: "",
        location: "",
        status: "Active",
      })
      fetchDepartments()
    } catch (error) {
      console.error("Create error:", error)
      toast.error(error?.response?.data?.message || "Failed to create department")
    }
  }

  // ✅ Delete department
  const handleDelete = async (id) => {
    const confirm = window.confirm("Are you sure you want to delete this department?")
    if (!confirm) return

    try {
      await axios.delete(`http://localhost:5000/api/departments/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      toast.success("Department deleted")
      fetchDepartments()
    } catch (error) {
      console.error("Delete error:", error)
      toast.error(error?.response?.data?.message || "Failed to delete department")
    }
  }

  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600">Add a new department to the system</p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-md flex items-center space-x-2 hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          <span>Add Department</span>
        </button>
      </div>

      {/* Department Table */}
      <div>
        <h2 className="text-xl font-semibold mb-2">All Departments</h2>
        <div className="border rounded-md overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2">Name</th>
                <th className="px-4 py-2">Description</th>
                <th className="px-4 py-2">Budget</th>
                <th className="px-4 py-2">Location</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {departments.map((dept) => (
                <tr key={dept._id || dept.id} className="border-t">
                  <td className="px-4 py-2">{dept.name}</td>
                  <td className="px-4 py-2">{dept.description}</td>
                  <td className="px-4 py-2">{dept.budget}</td>
                  <td className="px-4 py-2">{dept.location}</td>
                  <td className="px-4 py-2">{dept.status}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleDelete(dept._id || dept.id)}
                      className="text-red-600 hover:text-red-800 flex items-center"
                    >
                      <Trash2 className="w-4 h-4 mr-1" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {departments.length === 0 && (
                <tr>
                  <td colSpan="6" className="text-center text-gray-500 py-4">
                    No departments found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-96 p-6 shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Add New Department</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-sm font-medium block mb-1">Name *</label>
                <input
                  required
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Description</label>
                <textarea
                  rows="2"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Budget</label>
                <input
                  type="number"
                  value={formData.budget}
                  onChange={(e) => setFormData({ ...formData, budget: Number(e.target.value) })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Location</label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                />
              </div>
              <div>
                <label className="text-sm font-medium block mb-1">Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="border px-4 py-2 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Departments

