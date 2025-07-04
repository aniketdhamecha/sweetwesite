import React from 'react';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [credentails, setCredentials] = React.useState({ name: "", email: "", location: "", password: "" });

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
        password: credentails.password
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
    <>
      <form onSubmit={handleSubmit}>
        <div className='container'>

          {/* Name */}
          <div className='mb-3'>
            <label htmlFor="name" className="form-label">Name</label>
            <input type="text" className="form-control" id="name" name="name" value={credentails.name} onChange={onChange} />
            <div className="form-text">We'll never share your name with anyone else.</div>
          </div>

          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" name="email" value={credentails.email} onChange={onChange} />
            <div className="form-text">We'll never share your email with anyone else.</div>
          </div>

          {/* Location */}
          <div className="mb-3">
            <label htmlFor="location" className="form-label">Location</label>
            <input type="text" className="form-control" id="location" name="location" value={credentails.location} onChange={onChange} />
            <div className="form-text">We'll never share your location with anyone else.</div>
          </div>

          {/* Password */}
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" name="password" value={credentails.password} onChange={onChange} />
          </div>

          {/* Buttons */}
          <button type="submit" className="btn btn-success">Submit</button>
          <Link to="/Login" className="btn btn-danger m-3">Log In</Link>
        </div>
      </form>
    </>
  );
}
