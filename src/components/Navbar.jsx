import React from "react";
import Modal from "../Modal";
import Cart from "../screens/Cart";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [cartView, setCartView] = React.useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-success shadow-lg">
        <div className="container-fluid">
          <Link className="navbar-brand fs-2 fw-bold fst-italic text-light" to="/">
            🍽️ GoFood
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse justify-content-between" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link fs-5 text-white" to="/">
                  🏠 Home
                </Link>
              </li>
              {localStorage.getItem("authToken") && (
                <li className="nav-item">
                  <Link className="nav-link fs-5 text-white" to="/myOrder">
                    📦 My Orders
                  </Link>
                </li>
              )}
            </ul>

            {!localStorage.getItem("authToken") ? (
              <div className="d-flex">
                <Link className="btn btn-outline-light mx-2 fw-semibold" to="/login">
                  🔐 Login
                </Link>
                <Link className="btn btn-light text-success mx-2 fw-semibold" to="/signup">
                  📝 Sign Up
                </Link>
              </div>
            ) : (
              <div className="d-flex align-items-center">
                <button
                  className="btn btn-light text-success mx-2 fw-semibold"
                  onClick={() => setCartView(true)}
                >
                  🛒 My Cart
                </button>
                {cartView && (
                  <Modal onClose={() => setCartView(false)}>
                    <Cart />
                  </Modal>
                )}
                <button
                  className="btn btn-danger mx-2 fw-semibold"
                  onClick={handleLogout}
                >
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
