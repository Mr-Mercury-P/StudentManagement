const express = require("express");
const Company = require("../models/companies");
const Student = require("../models/student"); // Import Student model
const router = express.Router();

// Get all companies
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find().lean();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add a new company
router.post("/", async (req, res) => {
  try {
    const { name, packageInLakhs, placed_students } = req.body;

    if (!name || !packageInLakhs) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCompany = new Company({
      name,
      packageInLakhs,
      placed_students: placed_students || [],
    });

    const savedCompany = await newCompany.save();
    res.status(201).json(savedCompany);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get students placed in a specific company by name
router.get("/:companyName/students", async (req, res) => {
  try {
    const { companyName } = req.params;
    const company = await Company.findOne({ name: companyName }).populate("placed_students.student_id").lean();

    if (!company) {
      return res.status(404).json({ message: "Company not found" });
    }

    res.status(200).json({ placed_students: company.placed_students });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
