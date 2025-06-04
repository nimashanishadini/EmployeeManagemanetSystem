"use client"
import { useAuth } from "../contexts/AuthContext"
import { LogOut, User } from "lucide-react"

const Header = () => {
  const { user, logout } = useAuth()

  return (
    <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-semibold text-gray-800">Employee Management System</h2>

        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <User className="h-5 w-5 text-gray-600" />
            <span className="text-gray-700">{user?.username}</span>
            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">{user?.role}</span>
          </div>

          <button
            onClick={logout}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 transition-colors"
          >
            <LogOut className="h-5 w-5" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
