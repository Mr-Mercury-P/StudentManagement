import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddStudent from "./components/AddStudent";
import RetrieveStudent from "./components/RetrieveStudent";
import StudentSelector from "./components/StudentSelector";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/retrieve-student" element={<RetrieveStudent />} />
        <Route path="/add-placement-drive" element={<StudentSelector companyName="ABC Corp" packageInLakhs={10} />} />
      </Routes>
    </Router>
  );
}

export default App;
