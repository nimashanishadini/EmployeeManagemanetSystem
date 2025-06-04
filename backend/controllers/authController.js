import User from "../models/User.js"
import jwt from "jsonwebtoken"

const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || {
    expiresIn: "7d",
  })
}

// Register user
export const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return res.status(400).json({
        message: "User with this email or username already exists",
      })
    }

    const user = new User({ username, email, password, role })
    await user.save()

    const token = generateToken(user._id)

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

// Login user
export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    // Find user by email
    const user = await User.findOne({ email })

    if (!user || !user.isActive) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password)

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" })
    }

    const token = generateToken(user._id)

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

// Get current user
// export const getCurrentUser = async (req, res) => {
//   try {
//     const user = await User.findById(req.userId).select("-password")
//     res.json(user)
//   } catch (error) {
//     res.status(500).json({ message: error.message })
//   }
// }
