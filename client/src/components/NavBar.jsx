import { Link } from "react-router-dom";
import { useState } from "react";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [active, setActive] = useState("home");
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (item) => {
    setActive(item);
    setIsOpen(false);
  };

  return (
    <div>
      <style jsx>{`
        nav {
          background-color: #2563eb;
          padding: 1rem;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          position: relative;
        }

        .container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1200px;
          margin: 0 auto;
        }

        h1 {
          color: white;
          font-size: 1.5rem;
          font-weight: bold;
          margin: 0;
        }

        .nav-menu {
          display: flex;
          gap: 1.5rem;
          background-color: transparent;
          padding: 0;
          align-items: center;
        }

        .nav-item {
          padding: 0.5rem 1rem;
          color: white;
          border-radius: 0.375rem;
          transition: background-color 0.3s, transform 0.2s;
          text-decoration: none;
          display: inline-block;
        }

        .nav-item:hover {
          background-color: #1d4ed8;
          transform: translateY(-2px);
        }

        .active {
          background-color: #1e40af;
        }

        .button {
          padding: 0.75rem 1.5rem;
          background-color: white;
          color: #2563eb;
          border: none;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
          font-weight: bold;
        }

        .button:hover {
          background-color: #e5e7eb;
          transform: translateY(-2px);
        }

        .menu-toggle {
          display: none;
          cursor: pointer;
          color: white;
          transition: transform 0.3s;
        }

        .menu-toggle:hover {
          transform: scale(1.1);
        }

        @media (max-width: 768px) {
          .nav-menu {
            display: ${isOpen ? "flex" : "none"};
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background-color: #2563eb;
            padding: 1rem;
            z-index: 10;
            gap: 1rem;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
          }

          .menu-toggle {
            display: block;
          }

          .button {
            width: 100%;
            text-align: center;
          }
        }
      `}</style>

      <nav>
        <div className="container">
          <h1>Student Management</h1>
          <div className="menu-toggle" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </div>

          <div className="nav-menu">
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              <li>
                <Link
                  to="/add-student"
                  className={`nav-item ${active === "store" ? "active" : ""}`}
                  onClick={() => handleNavClick("store")}
                >
                  Store Student
                </Link>
              </li>
              <li>
                <Link
                  to="/retrieve-student"
                  className={`nav-item ${active === "retrieve" ? "active" : ""}`}
                  onClick={() => handleNavClick("retrieve")}
                >
                  Retrieve Details
                </Link>
              </li>
              <li>
                <Link
                  to="/add-placement-drive"
                  className={`nav-item ${active === "add-placement-drive" ? "active" : ""}`}
                  onClick={() => handleNavClick("add-placement-drive")}
                >
                  Add Placement drive
                </Link>
              </li>
              <li>
                <Link
                  to="/view-placements"
                  className={`nav-item ${active === "view-placements" ? "active" : ""}`}
                  onClick={() => handleNavClick("view-placements")}
                >
                  View Placements
                </Link>
              </li>
            </ul>
            <Button className="button">Login</Button>
          </div>
        </div>
      </nav>
    </div>
  );
}

function Button({ className, children }) {
  return <button className={className}>{children}</button>;
}
