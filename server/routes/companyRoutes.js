const express = require('express');
const Comapny = require('../models/companies');
const router = express.Router();

// 1️⃣ Add a new company
router.post("/add", async (req, res) => {
  try {
    const { _id, name, location } = req.body;

    const company = new Company({ _id, name, location, placed_students: [] });
    await company.save();

    res.status(201).json({ message: "Company added successfully", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 2️⃣ Get all companies
router.get("/all", async (req, res) => {
  try {
    const companies = await Company.find();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 3️⃣ Get a specific company by ID
router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 4️⃣ Update company details
router.put("/update/:id", async (req, res) => {
  try {
    const { name, location } = req.body;

    const company = await Company.findByIdAndUpdate(
      req.params.id,
      { name, location },
      { new: true, runValidators: true }
    );

    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company updated successfully", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 5️⃣ Delete a company
router.delete("/delete/:id", async (req, res) => {
  try {
    const company = await Company.findByIdAndDelete(req.params.id);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json({ message: "Company deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 6️⃣ Add a placed student to a company
router.post("/place-student/:companyId", async (req, res) => {
  try {
    const { student_id, placement_date, role, package } = req.body;
    
    const company = await Company.findById(req.params.companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    company.placed_students.push({ student_id, placement_date, role, package });
    await company.save();

    res.status(201).json({ message: "Student added to placement list", company });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// 7️⃣ Get all placed students for a company
router.get("/placed-students/:companyId", async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId);
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company.placed_students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
