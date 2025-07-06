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
      <nav className="navbar navbar-expand-lg navbar-dark bg-success">
        <Link className="navbar-brand fs-1 fst-italic" to="/">
          GoFood
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="/navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2">
            <li className="nav-item active">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            {localStorage.getItem("authToken") && (
              <li className="nav-item">
                <Link className="nav-link" to="/myOrder">
                  My Orders
                </Link>
              </li>
            )}
          </ul>
          {!localStorage.getItem("authToken") ? (
            <div className="d-flex">
              <Link className="btn bg-white text-success mx-1" to="/login">
                Login
              </Link>
              <Link className="btn bg-white text-success mx-1" to="/signup">
                Sign Up
              </Link>
            </div>
          ) : (
            <div>
              <div
                className="btn bg-white text-success mx-2"
                onClick={() => setCartView(true)}
              >
                My Cart
              </div>
              {cartView && (
                <Modal onClose={() => setCartView(false)}>
                  <Cart />
                </Modal>
              )}
              <div
                className="btn bg-white text-danger mx-2"
                onClick={handleLogout}
              >
                LogOut
              </div>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;