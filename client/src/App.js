import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import StoreUser from "./components/StoreUser";
import RetrieveUser from "./components/RetrieveUser";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/store-user" element={<StoreUser />} />
        <Route path="/retrieve-user" element={<RetrieveUser />} />
      </Routes>
    </Router>
  );
}

export default App;
