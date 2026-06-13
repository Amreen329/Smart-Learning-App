import { Link } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const [showProfile, setShowProfile] = useState(false);
  const { user, logout } = useContext(AuthContext);

  return (
    <div className="navbar">
      <div className="logo">Smart Learning</div>

      <div className="nav-links">
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/courses">Courses</Link>
        <Link to="/assignments">Assignments</Link>
        <Link to="/jobs">Jobs</Link>

        <div className="profile-section">
          <FaUserCircle
            size={32}
            className="profile-icon"
            onClick={() => setShowProfile(!showProfile)}
          />

          {showProfile && (
            <div className="profile-dropdown">
              <h4>{user?.name || "Guest"}</h4>
              <p>{user?.email || "Not logged in"}</p>
              <p>{user?.role || "Visitor"}</p>

              <button onClick={logout}>
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;