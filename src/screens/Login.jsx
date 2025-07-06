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
      // ✅ Save the user email to localStorage
      localStorage.setItem("userEmail", credentails.email);
      // ✅ Save the authToken to localStorage
      localStorage.setItem("authToken", json.authToken);

      // ✅ Redirect to home page
      navigate("/");
    } else {
      alert("Login failed: " + json.error);
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentails, [e.target.name]: e.target.value });
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='container'>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={credentails.email}
              onChange={onChange}
            />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={credentails.password}
              onChange={onChange}
            />
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/signup" className="btn btn-danger m-3">I'm a new user</Link>
        </div>
      </form>
    </>
  );
}
