const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
  },
  rollno: {
    type: String,
    required: [true, 'Roll number is required'],
    unique: true,
    trim: true,
  },
  department: {
    type: String,
    required: [true, 'Department is required'],
    enum: ['CSE', 'ECE', 'ME', 'CE'], // Add more departments as needed
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Please provide a valid email address',
    ],
  },  
  phone: {
    type: String,
    required: [true, 'Phone number is required'],
    unique: true,
    match: [/^\d{10}$/, 'Phone number must be 10 digits'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the model for the schema
const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
