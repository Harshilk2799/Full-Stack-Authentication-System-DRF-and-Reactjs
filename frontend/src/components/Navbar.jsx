import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router";

function Navbar() {
  const { isAuthenticated, setIsAuthenticated, logout } = useAuth();
  console.log("Auth: ", isAuthenticated);
  const navigate = useNavigate();

  function handleLogout(e) {
    e.preventDefault();
    logout();
    navigate("/login");
    setIsAuthenticated(false);
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-lg">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold fs-4 text-primary" to="/">
          <i className="bi bi-shield-lock-fill me-2"></i>
          Authentication System
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          {isAuthenticated ? (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <Link
                  className="nav-link btn btn-outline-warning px-3 py-2 rounded-pill text-decoration-none border-2 fw-semibold"
                  to="/change-password"
                >
                  <i className="bi bi-key-fill me-2"></i>
                  Change Password
                </Link>
              </li>
              <li className="nav-item">
                <button
                  onClick={handleLogout}
                  className="nav-link btn btn-outline-danger px-3 py-2 rounded-pill border-2 fw-semibold"
                  style={{ border: "none", background: "transparent" }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>
                  Logout
                </button>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item me-3">
                <Link
                  className="nav-link btn btn-outline-success px-3 py-2 rounded-pill text-decoration-none border-2 fw-semibold"
                  to="/register"
                >
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  className="nav-link btn btn-outline-primary px-3 py-2 rounded-pill text-decoration-none border-2 fw-semibold"
                  to="/login"
                >
                  <i className="bi bi-person-fill me-2"></i>
                  Login
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
