import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [credentails, setCredentials] = React.useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentails.email,
        password: credentails.password,
      }),
    });

    const json = await response.json();
    console.log("Login response:", json); // For debugging

    if (json.success) {
      localStorage.setItem("userEmail", credentails.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    } else {
      alert("Login failed: " + json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-bg d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow-lg rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center text-success mb-4">Login to Your Account</h2>
        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">Email address</label>
            <input
              type="email"
              className="form-control shadow-sm"
              id="email"
              name="email"
              value={credentails.email}
              onChange={onChange}
              required
            />
            <div className="form-text text-muted">We'll never share your email.</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              id="password"
              name="password"
              value={credentails.password}
              onChange={onChange}
              required
            />
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-success fw-bold">Login</button>
            <Link to="/signup" className="btn btn-outline-danger">New user? Sign up</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
