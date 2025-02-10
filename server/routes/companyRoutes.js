const express = require('express');
const Company = require('../models/companies');
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const companies = await Company.find().lean();
    res.status(200).json(companies);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const company = await Company.findById(req.params.id).lean();
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all placed students for a company
router.get("/placed-students/:companyId", async (req, res) => {
  try {
    const company = await Company.findById(req.params.companyId).lean();
    if (!company) return res.status(404).json({ message: "Company not found" });

    res.status(200).json(company.placed_students);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
