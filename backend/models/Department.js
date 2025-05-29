import mongoose from "mongoose"

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Department name is required"],
      unique: true,
      trim: true,
      maxlength: [100, "Department name cannot exceed 100 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "Description cannot exceed 500 characters"],
    },
    manager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
    },
    budget: {
      type: Number,
      min: [0, "Budget cannot be negative"],
      default: 0,
    },
    location: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["Active", "Inactive"],
      default: "Active",
    },
  },
  {
    timestamps: true,
  },
)

export default mongoose.model("Department", departmentSchema)
