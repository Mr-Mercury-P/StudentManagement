const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Unique company name
  packageInLakhs: { type: Number, required: true }, // Salary in LPA
  placed_students: [
    {
      student_id: { type: mongoose.Schema.Types.ObjectId, ref: "Student", required: true }, // Reference to Student
      placement_date: { type: Date, default: Date.now }, // Default to current date
    },
  ],
});


const Company = mongoose.models.Company || mongoose.model("Company", companySchema, "companies");

module.exports = Company;
