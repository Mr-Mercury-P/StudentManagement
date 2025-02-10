import axios from "axios";
import { useEffect, useState } from "react";

export default function StudentSelector() {
  const [students, setStudents] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [companyName, setCompanyName] = useState("");
  const [packageInLakhs, setPackageInLakhs] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:4000/students")
      .then((response) => setStudents(response.data))
      .catch((error) => console.error("Error fetching students:", error));
  }, []);

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId) ? prev.filter((id) => id !== studentId) : [...prev, studentId]
    );
  };

  const handleConfirmSelection = async () => {
    if (!companyName || !packageInLakhs) {
      alert("Please enter company name and package.");
      return;
    }

    try {
      await axios.post("http://localhost:4000/companies", {
        name: companyName,
        packageInLakhs: Number(packageInLakhs),
        placed_students: selectedStudents.map((studentId) => ({
          student_id: studentId,
        })),
      });
      alert("Placement data saved successfully!");
    } catch (error) {
      console.error("Error saving placement data:", error);
    }
  };

  // Styles
  const styles = {
    container: {
      maxWidth: "600px",
      margin: "2rem auto",
      backgroundColor: "white",
      padding: "2rem",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
      border: "1px solid #ccc",
    },
    title: {
      fontSize: "24px",
      fontWeight: "bold",
      textAlign: "center",
      color: "#333",
      marginBottom: "1.5rem",
    },
    inputField: {
      width: "100%",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "1rem",
      transition: "border-color 0.3s",
    },
    inputFieldFocus: {
      borderColor: "#007bff",
      outline: "none",
    },
    card: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: "12px",
      border: "1px solid #ccc",
      borderRadius: "4px",
      marginBottom: "1rem",
    },
    button: {
      width: "100%",
      padding: "12px",
      backgroundColor: "#007bff",
      color: "white",
      border: "none",
      borderRadius: "4px",
      fontWeight: "bold",
      cursor: "pointer",
      transition: "background-color 0.3s, transform 0.3s",
    },
    buttonHover: {
      backgroundColor: "#0056b3",
      transform: "scale(1.05)",
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Select Students for Placement</h2>

      {/* Company & Package Inputs */}
      <input
        type="text"
        placeholder="Company Name"
        value={companyName}
        onChange={(e) => setCompanyName(e.target.value)}
        style={styles.inputField}
        onFocus={(e) => (e.target.style.borderColor = styles.inputFieldFocus.borderColor)}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        required
      />
      <input
        type="number"
        placeholder="Package in LPA"
        value={packageInLakhs}
        onChange={(e) => setPackageInLakhs(e.target.value)}
        style={styles.inputField}
        onFocus={(e) => (e.target.style.borderColor = styles.inputFieldFocus.borderColor)}
        onBlur={(e) => (e.target.style.borderColor = "#ccc")}
        required
      />

      {/* Students List */}
      <div>
        {students.map((student, index) => (
          <div key={student._id || index} style={styles.card}>
            <span>{student.name}</span>
            <input
              type="checkbox"
              checked={selectedStudents.includes(student._id)}
              onChange={() => handleSelectStudent(student._id)}
            />
          </div>
        ))}
      </div>

      {/* Confirm Button */}
      <button
        onClick={handleConfirmSelection}
        style={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Confirm Selection
      </button>
    </div>
  );
}
