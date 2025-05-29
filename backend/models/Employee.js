import mongoose from "mongoose"
import validator from "validator"

const employeeSchema = new mongoose.Schema(
  {
    employeeId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [50, "First name cannot exceed 50 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [50, "Last name cannot exceed 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: (v) => /^\+?[\d\s-()]+$/.test(v),
        message: "Please provide a valid phone number",
      },
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: [true, "Department is required"],
    },
    position: {
      type: String,
      required: [true, "Position is required"],
      trim: true,
    },
    salary: {
      type: Number,
      required: [true, "Salary is required"],
      min: [0, "Salary cannot be negative"],
    },
    dateOfJoining: {
      type: Date,
      required: [true, "Date of joining is required"],
      default: Date.now,
    },
    dateOfBirth: {
      type: Date,
      required: [true, "Date of birth is required"],
    },
    address: {
      street: String,
      city: String,
      state: String,
      zipCode: String,
      country: String,
    },
    emergencyContact: {
      name: String,
      relationship: String,
      phone: String,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive", "Terminated"],
      default: "Active",
    },
    profileImage: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  },
)

// Generate employee ID before saving
employeeSchema.pre("save", async function (next) {
  if (!this.employeeId) {
    const count = await mongoose.model("Employee").countDocuments()
    this.employeeId = `EMP${String(count + 1).padStart(4, "0")}`
  }
  next()
})

// Virtual for full name
employeeSchema.virtual("fullName").get(function () {
  return `${this.firstName} ${this.lastName}`
})

// Ensure virtual fields are serialized
employeeSchema.set("toJSON", { virtuals: true })

export default mongoose.model("Employee", employeeSchema)
