const express = require('express');
const Student = require('../models/student');
const router = express.Router();
router.get('/', async (req, res) => {
  try {
      console.log('Fetching students from the database...');
      const students = await Student.find();
      res.status(200).json(students);
  } catch (error) {
      res.status(500).json({ message: 'Server error' });
  }
});
router.post('/', async (req, res) => {
    try {
        const { name, rollno, department, email, phone } = req.body;
        if (!name || !rollno || !department || !email || !phone) {
            return res.status(400).json({ message: 'All fields are required' });
        }
        const existingStudent = await Student.findOne({ 
            $or: [{ rollno }, { email }, { phone }] 
        });
        if (existingStudent) {
            return res.status(409).json({ message: 'Student with this roll number, email, or phone already exists' });
        }
        const newStudent = new Student({ name, rollno, department, email, phone });
        await newStudent.save();
        res.status(201).json(newStudent);
    } catch (error) {
        console.error('Error creating student:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
module.exports = router;
