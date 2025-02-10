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
      const response = await fetch('http://localhost:4000/students', {
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

  // Inline styles
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '2rem auto',
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '8px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
      border: '1px solid #ccc',
    },
    title: {
      fontSize: '24px',
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#333',
      marginBottom: '1.5rem',
    },
    inputField: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '1rem',
      transition: 'border-color 0.3s',
    },
    inputFieldFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    selectField: {
      width: '100%',
      padding: '12px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      marginBottom: '1rem',
      transition: 'border-color 0.3s',
    },
    selectFieldFocus: {
      borderColor: '#007bff',
      outline: 'none',
    },
    submitButton: {
      width: '100%',
      padding: '12px',
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'background-color 0.3s, transform 0.3s',
    },
    submitButtonHover: {
      backgroundColor: '#0056b3',
      transform: 'scale(1.05)',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Add New Student</h2>
      <form onSubmit={handleSubmit}>
        <input 
          type="text" 
          name="name" 
          placeholder="Full Name" 
          value={formData.name} 
          onChange={handleChange} 
          style={styles.inputField} 
          onFocus={(e) => e.target.style.borderColor = styles.inputFieldFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
          required
        />
        <input 
          type="email" 
          name="email" 
          placeholder="Email" 
          value={formData.email} 
          onChange={handleChange} 
          style={styles.inputField} 
          onFocus={(e) => e.target.style.borderColor = styles.inputFieldFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
          required
        />
        <input 
          type="text" 
          name="rollno" 
          placeholder="Roll Number" 
          value={formData.rollno} 
          onChange={handleChange} 
          style={styles.inputField} 
          onFocus={(e) => e.target.style.borderColor = styles.inputFieldFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
          required
        />
        <input 
          type="text" 
          name="phone" 
          placeholder="Phone (10 digits)" 
          value={formData.phone} 
          onChange={handleChange} 
          pattern="\d{10}"
          style={styles.inputField} 
          onFocus={(e) => e.target.style.borderColor = styles.inputFieldFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = '#ccc'}
          required
        />
        <select 
          name="department" 
          value={formData.department} 
          onChange={handleChange} 
          style={styles.selectField} 
          onFocus={(e) => e.target.style.borderColor = styles.selectFieldFocus.borderColor}
          onBlur={(e) => e.target.style.borderColor = '# ccc'}
          required
        >
          <option value="">Select Department</option>
          <option value="CSE">Computer Science</option>
          <option value="ECE">Electronics & Communication</option>
          <option value="ME">Mechanical</option>
          <option value="IT">Information Technology</option>
        </select>
        <button 
          type="submit" 
          style={styles.submitButton}
          onMouseOver={(e) => e.target.style.backgroundColor = styles.submitButtonHover.backgroundColor}
          onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
        >
          Create Student
        </button>
      </form>
    </div>
  );
};

export default StudentForm;