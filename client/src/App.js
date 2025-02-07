import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import AddStudent from "./components/AddStudent";
import RetrieveStudent from "./components/RetrieveStudent";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/add-student" element={<AddStudent />} />
        <Route path="/retrieve-student" element={<RetrieveStudent />} />
      </Routes>
    </Router>
  );
}

export default App;
