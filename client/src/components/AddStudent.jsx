import React, { useState } from 'react';

const StudentForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    rollno: '',
    phone: '',
    department: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert('Student created successfully!');
        console.log(data);
        setFormData({ name: '', email: '', rollno: '', phone: '', department: '' });
      } else {
        alert('Failed to create student');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred');
    }
  };

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <h2 className="text-2xl font-semibold text-center mb-4">Add Student</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={formData.name} 
          onChange={handleChange} 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
        />
        <input 
          type="text" 
          name="rollno" 
          placeholder="Roll Number" 
          value={formData.rollno} 
          onChange={handleChange} 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone (10 digits)" 
          value={formData.phone} 
          onChange={handleChange} 
          pattern="\d{10}"
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
        />
        <select 
          name="department" 
          value={formData.department} 
          onChange={handleChange} 
          className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" required
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electronics & Communication</option>
          <option value="ME">Mechanical</option>
          <option value="IT">Information Technology</option>
        </select>
        <button 
          type="submit" 
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Create Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;