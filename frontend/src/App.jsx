// "use client"
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import { Toaster } from "react-hot-toast"
// import { AuthProvider, useAuth } from "./contexts/AuthContext"
// import Layout from "./components/Layout"
// import Login from "./pages/Login"
// import Dashboard from "./pages/Dashboard"
// import Employees from "./pages/Employees"
// import Departments from "./pages/Departments"
// import AddEmployee from "./pages/AddEmployee"
// import EditEmployee from "./pages/EditEmployee"
// import EmployeeDetail from "./pages/EmployeeDetail"
// import Register from "./pages/Register"

// // Protected Route Component
// const ProtectedRoute = ({ children }) => {
//   const { user, loading } = useAuth()

//   if (loading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
//       </div>
//     )
//   }

//   return user ? children : <Navigate to="/login" />
// }

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="App">
//           <Toaster position="top-right" />
//           <Routes>
//             <Route path="/login" element={<Login />} />
//             <Route path="/register" element={<Register />} />
//             <Route
//               path="/"
//               element={
//                 <ProtectedRoute>
//                   <Layout />
//                 </ProtectedRoute>
//               }
//             >
//               <Route index element={<Dashboard />} />
//               <Route path="employees" element={<Employees />} />
//               <Route path="employees/add" element={<AddEmployee />} />
//               <Route path="employees/edit/:id" element={<EditEmployee />} />
//               <Route path="employees/:id" element={<EmployeeDetail />} />
//               <Route path="departments" element={<Departments />} />
//             </Route>
//           </Routes>
//         </div>
//       </Router>
//     </AuthProvider>
//   )
// }

// export default App



"use client"
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import { AuthProvider, useAuth } from "./contexts/AuthContext"
import Layout from "./components/Layout"
import Login from "./pages/Login"
import Dashboard from "./pages/Dashboard"
import Employees from "./pages/Employees"
import Departments from "./pages/Departments"
import AddEmployee from "./pages/AddEmployee"
import EditEmployee from "./pages/EditEmployee"
import EmployeeDetail from "./pages/EmployeeDetail"
import Register from "./pages/Register"

// Protected Route Component
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return user ? children : <Navigate to="/login" />
}

// Layout Route Component
const LayoutRoute = () => {
  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Toaster position="top-right" />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route element={<ProtectedRoute><LayoutRoute /></ProtectedRoute>}>
              <Route index element={<Dashboard />} />
              <Route path="/employees" element={<Employees />} />
              <Route path="/employees/add" element={<AddEmployee />} />
              <Route path="/employees/edit/:id" element={<EditEmployee />} />
              <Route path="/employees/:id" element={<EmployeeDetail />} />
              <Route path="/departments" element={<Departments />} />
            </Route>
            
            {/* Fallback route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  )
}

export default App