// "use client"

// import { useState, useEffect } from "react"
// import { useNavigate } from "react-router-dom"
// import { useForm } from "react-hook-form"
// import { employeeAPI, departmentAPI } from "./../services/api"
// import toast from "react-hot-toast"
// import { ArrowLeft, Save } from "lucide-react"

// const AddEmployee = () => {
//   const navigate = useNavigate()
//   const [departments, setDepartments] = useState([])
//   const [loading, setLoading] = useState(false)

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm()

//   useEffect(() => {
//     fetchDepartments()
//   }, [])

  

//   const fetchDepartments = async () => {
//   try {
//     const response = await departmentAPI.getAll();
//     setDepartments(response.data);
//   } catch (error) {
//     console.error("Error fetching departments:", error);
//     toast.error(error.response?.data?.message || "Error fetching departments");
//   }
// };


// useEffect(() => {
//     const loadDepartments = async () => {
//       try {
//         const response = await departmentAPI.getAll()
//         setDepartments(response.data)
//       } catch (error) {
//         console.error("Department fetch error:", error)
//         toast.error("Failed to load departments. Please try again later.")
//       }
//     }
//     loadDepartments()
//   }, [])

//   const onSubmit = async (data) => {
//     setLoading(true)
//     try {
//       await employeeAPI.create(data)
//       toast.success("Employee created successfully")
//       navigate("/employees")
//     } catch (error) {
//       console.error("Employee creation error:", error)
//       toast.error(error.response?.data?.message || "Error creating employee")
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center space-x-4">
//         <button onClick={() => navigate("/employees")} className="flex items-center text-gray-600 cursor-pointer hover:text-gray-800">
//           <ArrowLeft className="h-5 w-5 mr-1" />
//         </button>
//         <h1 className="text-3xl font-bold text-gray-900">Add New Employee</h1>
//       </div>

//       <div className="bg-white rounded-lg shadow">
//         <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
//           {/* Personal Information */}
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Personal Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>

//                 <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Employee ID *</label>
//                 <input
//                   type="text"
//                   className="input"
//                   {...register("employeeId", { required: "Employee ID is required" })}
//                 />
//                 {errors.employeeId && <p className="mt-1 text-sm text-red-600">{errors.employeeId.message}</p>}
//               </div>

//                 <label className="block text-sm font-medium text-gray-700 mb-2">First Name *</label>
//                 <input
//                   type="text"
//                   className="input"
//                   {...register("firstName", { required: "First name is required" })}
//                 />
//                 {errors.firstName && <p className="mt-1 text-sm text-red-600">{errors.firstName.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Last Name *</label>
//                 <input type="text" className="input" {...register("lastName", { required: "Last name is required" })} />
//                 {errors.lastName && <p className="mt-1 text-sm text-red-600">{errors.lastName.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
//                 <input
//                   type="email"
//                   className="input"
//                   {...register("email", {
//                     required: "Email is required",
//                     pattern: {
//                       value: /^\S+@\S+$/i,
//                       message: "Invalid email address",
//                     },
//                   })}
//                 />
//                 {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
//                 <input type="tel" className="input" {...register("phone", { required: "Phone is required" })} />
//                 {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth *</label>
//                 <input
//                   type="date"
//                   className="input"
//                   {...register("dateOfBirth", { required: "Date of birth is required" })}
//                 />
//                 {errors.dateOfBirth && <p className="mt-1 text-sm text-red-600">{errors.dateOfBirth.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Date of Joining *</label>
//                 <input
//                   type="date"
//                   className="input"
//                   {...register("dateOfJoining", { required: "Date of joining is required" })}
//                 />
//                 {errors.dateOfJoining && <p className="mt-1 text-sm text-red-600">{errors.dateOfJoining.message}</p>}
//               </div>
//             </div>
//           </div>

//           {/* Work Information */}
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Work Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Department *</label>
//                 <select className="input" {...register("department", { required: "Department is required" })}>
//                   <option value="">Select Department</option>
//                   {departments.map((dept) => (
//                     <option key={dept._id} value={dept._id}>
//                       {dept.name}
//                     </option>
//                   ))}
//                 </select>
//                 {errors.department && <p className="mt-1 text-sm text-red-600">{errors.department.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Position *</label>
//                 <input type="text" className="input" {...register("position", { required: "Position is required" })} />
//                 {errors.position && <p className="mt-1 text-sm text-red-600">{errors.position.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Salary *</label>
//                 <input
//                   type="number"
//                   className="input"
//                   {...register("salary", {
//                     required: "Salary is required",
//                     min: { value: 0, message: "Salary must be positive" },
//                   })}
//                 />
//                 {errors.salary && <p className="mt-1 text-sm text-red-600">{errors.salary.message}</p>}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
//                 <select className="input" {...register("status")}>
//                   <option value="Active">Active</option>
//                   <option value="Inactive">Inactive</option>
//                   <option value="Terminated">Terminated</option>
//                 </select>
//               </div>
//             </div>
//           </div>

//           {/* Address Information */}
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Address Information</h2>
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Street</label>
//                 <input type="text" className="input" {...register("address.street")} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
//                 <input type="text" className="input" {...register("address.city")} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
//                 <input type="text" className="input" {...register("address.state")} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Zip Code</label>
//                 <input type="text" className="input" {...register("address.zipCode")} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
//                 <input type="text" className="input" {...register("address.country")} />
//               </div>
//             </div>
//           </div>

//           {/* Emergency Contact */}
//           <div>
//             <h2 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
//                 <input type="text" className="input" {...register("emergencyContact.name")} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
//                 <input type="text" className="input" {...register("emergencyContact.relationship")} />
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
//                 <input type="tel" className="input" {...register("emergencyContact.phone")} />
//               </div>
//             </div>
//           </div>

//           {/* Submit Button */}
//           <div className="flex justify-end space-x-4">
//             <button type="button" onClick={() => navigate("/employees")} className="btn btn-secondary">
//               Cancel
//             </button>
//             <button type="submit" disabled={loading} className="btn btn-primary flex items-center space-x-2">
//               <Save className="h-4 w-4" />
//               <span>{loading ? "Creating..." : "Create Employee"}</span>
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }

// export default AddEmployee

"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { employeeAPI, departmentAPI } from "./../services/api"
import toast from "react-hot-toast"
import { 
  ArrowLeft, 
  Save, 
  User, 
  Briefcase, 
  MapPin, 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  Building,
  AlertCircle,
  Loader2,
  UserPlus
} from "lucide-react"

const AddEmployee = () => {
  const navigate = useNavigate()
  const [departments, setDepartments] = useState([])
  const [loading, setLoading] = useState(false)
  const [departmentsLoading, setDepartmentsLoading] = useState(true)

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset
  } = useForm({
    defaultValues: {
      status: "Active",
      dateOfJoining: new Date().toISOString().split('T')[0] // Default to today
    }
  })

  // Watch for form changes to show unsaved changes warning
  const watchedFields = watch()

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      setDepartmentsLoading(true)
      const response = await departmentAPI.getAll()
      setDepartments(response.data)
    } catch (error) {
      console.error("Error fetching departments:", error)
      toast.error(error.response?.data?.message || "Failed to load departments")
    } finally {
      setDepartmentsLoading(false)
    }
  }

  const onSubmit = async (data) => {
    setLoading(true)
    try {
      // Format the data before sending
      const formattedData = {
        ...data,
        salary: parseFloat(data.salary),
        // Ensure nested objects are properly structured
        address: {
          street: data.address?.street || "",
          city: data.address?.city || "",
          state: data.address?.state || "",
          zipCode: data.address?.zipCode || "",
          country: data.address?.country || "",
        },
        emergencyContact: {
          name: data.emergencyContact?.name || "",
          relationship: data.emergencyContact?.relationship || "",
          phone: data.emergencyContact?.phone || "",
        }
      }
      
      await employeeAPI.create(formattedData)
      toast.success("Employee created successfully!")
      navigate("/employees")
    } catch (error) {
      console.error("Employee creation error:", error)
      toast.error(error.response?.data?.message || "Failed to create employee")
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate("/employees")
  }

  const generateEmployeeId = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.floor(Math.random() * 100).toString().padStart(2, '0')
    return `EMP${timestamp}${random}`
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-red rounded-lg shadow-sm p-6">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleCancel}
              className="flex items-center text-gray-600 hover:text-gray-800 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <UserPlus className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Add New Employee</h1>
                <p className="text-gray-600">Create a new employee record in the system</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Form */}
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="divide-y divide-gray-200">
            
            {/* Personal Information Section */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <User className="h-5 w-5 text-green-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Personal Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Employee ID <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Enter employee ID or generate one"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      {...register("employeeId", { required: "Employee ID is required" })}
                    />
                    <button
                      type="button"
                      onClick={() => {
                        const id = generateEmployeeId()
                        document.querySelector('input[name="employeeId"]').value = id
                      }}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 text-xs bg-gray-100 hover:bg-gray-200 px-2 py-1 rounded text-gray-600 transition-colors"
                    >
                      Generate
                    </button>
                  </div>
                  {errors.employeeId && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.employeeId.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter first name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("firstName", { required: "First name is required" })}
                  />
                  {errors.firstName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter last name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("lastName", { required: "Last name is required" })}
                  />
                  {errors.lastName && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.lastName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter email address"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Invalid email address",
                        },
                      })}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.email.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter phone number"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      {...register("phone", { required: "Phone number is required" })}
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      {...register("dateOfBirth", { required: "Date of birth is required" })}
                    />
                  </div>
                  {errors.dateOfBirth && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.dateOfBirth.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Work Information Section */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-5 w-5 text-blue-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Work Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Department <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <select 
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors appearance-none bg-white"
                      {...register("department", { required: "Department is required" })}
                    >
                      <option value="">Select Department</option>
                      {departments.map((dept) => (
                        <option key={dept._id} value={dept._id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                    {departmentsLoading && (
                      <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 animate-spin" />
                    )}
                  </div>
                  {errors.department && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.department.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Position/Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Enter job position"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("position", { required: "Position is required" })}
                  />
                  {errors.position && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.position.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Annual Salary <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="number"
                      placeholder="Enter annual salary"
                      min="0"
                      step="0.01"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      {...register("salary", {
                        required: "Salary is required",
                        min: { value: 0, message: "Salary must be positive" },
                      })}
                    />
                  </div>
                  {errors.salary && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.salary.message}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Joining <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="date"
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                      {...register("dateOfJoining", { required: "Date of joining is required" })}
                    />
                  </div>
                  {errors.dateOfJoining && (
                    <p className="mt-1 text-sm text-red-600 flex items-center">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      {errors.dateOfJoining.message}
                    </p>
                  )}
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Employment Status</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("status")}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                    <option value="Terminated">Terminated</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address Information Section */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <MapPin className="h-5 w-5 text-purple-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Address Information</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Street Address</label>
                  <input
                    type="text"
                    placeholder="Enter street address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("address.street")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">City</label>
                  <input
                    type="text"
                    placeholder="Enter city"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("address.city")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">State/Province</label>
                  <input
                    type="text"
                    placeholder="Enter state or province"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("address.state")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">ZIP/Postal Code</label>
                  <input
                    type="text"
                    placeholder="Enter ZIP or postal code"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("address.zipCode")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Country</label>
                  <input
                    type="text"
                    placeholder="Enter country"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("address.country")}
                  />
                </div>
              </div>
            </div>

            {/* Emergency Contact Section */}
            <div className="p-6">
              <div className="flex items-center space-x-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <Phone className="h-5 w-5 text-red-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Emergency Contact</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Name</label>
                  <input
                    type="text"
                    placeholder="Enter contact name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("emergencyContact.name")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Relationship</label>
                  <input
                    type="text"
                    placeholder="e.g., Spouse, Parent, Sibling"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("emergencyContact.relationship")}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Contact Phone</label>
                  <input
                    type="tel"
                    placeholder="Enter phone number"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    {...register("emergencyContact.phone")}
                  />
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="px-6 py-4 bg-gray-50 flex justify-end space-x-4">
              <button
                type="button"
                onClick={handleCancel}
                disabled={loading}
                className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    <span>Creating...</span>
                  </>
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    <span>Create Employee</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddEmployee
