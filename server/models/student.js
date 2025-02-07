const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Unique company ID
  name: { type: String, required: true },
  location: { type: String, required: true },
  placed_students: [
    {
      student_id: { type: String, required: true }, // Reference to Student _id
      placement_date: { type: Date, required: true },
      role: { type: String, required: true },
      package: { type: Number, required: true }, // Salary in LPA
    },
  ],
});

// Check if the model already exists to prevent overwriting
const Company = mongoose.models.companies || mongoose.model("Company", companySchema, "companies");

module.exports = Company;
