import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [credentails, setCredentials] = React.useState({
    name: "",
    email: "",
    location: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/createuser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: credentails.name,
        email: credentails.email,
        location: credentails.location,
        password: credentails.password,
      }),
    });

    const json = await response.json();
    console.log(json);
    if (json.success) {
      alert("User created successfully");
    } else {
      alert("Error creating user: " + json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <div className="signup-bg d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa' }}>
      <div className="card p-4 shadow-lg rounded" style={{ width: '100%', maxWidth: '500px' }}>
        <h2 className="text-center text-success mb-4">Create Your Account</h2>
        <form onSubmit={handleSubmit}>

          {/* Name */}
          <div className="mb-3">
            <label htmlFor="name" className="form-label fw-semibold">Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              id="name"
              name="name"
              value={credentails.name}
              onChange={onChange}
              required
            />
            <div className="form-text text-muted">We'll never share your name.</div>
          </div>

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

          {/* Location */}
          <div className="mb-3">
            <label htmlFor="location" className="form-label fw-semibold">Location</label>
            <input
              type="text"
              className="form-control shadow-sm"
              id="location"
              name="location"
              value={credentails.location}
              onChange={onChange}
              required
            />
            <div className="form-text text-muted">We don’t track exact address.</div>
          </div>

          {/* Password with tooltip */}
          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              id="password"
              name="password"
              value={credentails.password}
              onChange={onChange}
              required
              onFocus={() => {
                const tip = document.getElementById('signup-password-tip');
                if (tip) tip.style.display = 'block';
              }}
              onBlur={() => {
                const tip = document.getElementById('signup-password-tip');
                if (tip) tip.style.display = 'none';
              }}
            />
            <div
              id="signup-password-tip"
              className="text-muted small position-absolute"
              style={{
                top: '100%',
                left: 0,
                zIndex: 10,
                backgroundColor: '#fff',
                border: '1px solid #ced4da',
                padding: '8px',
                marginTop: '5px',
                borderRadius: '4px',
                display: 'none',
              }}
            >
              🔒 Tip: Use at least 8 characters, a symbol, a number, and a capital letter
            </div>
          </div>

          {/* Buttons */}
          <div className="d-grid gap-2 mt-4">
            <button type="submit" className="btn btn-success fw-bold">Sign Up</button>
            <Link to="/login" className="btn btn-outline-danger">Already have an account?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
