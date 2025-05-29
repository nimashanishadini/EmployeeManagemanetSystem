import { NavLink } from "react-router-dom"
import { Home, Users, Building2, UserPlus, BarChart3 } from "lucide-react"

const Sidebar = () => {
  const navItems = [
    { to: "/", icon: Home, label: "Dashboard" },
    { to: "/employees", icon: Users, label: "Employees" },
    { to: "/employees/add", icon: UserPlus, label: "Add Employee" },
    { to: "/departments", icon: Building2, label: "Departments" },
  ]

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="flex items-center mb-8">
        <BarChart3 className="h-8 w-8 mr-2" />
        <h1 className="text-xl font-bold">EMS</h1>
      </div>

      <nav>
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center p-3 rounded-lg transition-colors ${
                    isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`
                }
              >
                <item.icon className="h-5 w-5 mr-3" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default Sidebar
