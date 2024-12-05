import React, { useState } from "react";
import "./styles.css";
import { signUp } from "../firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Attempt to create a new user
      const userCredential = await signUp(email, password);

      if (userCredential) {
        // If the user object is returned, signup is successful
        setSuccessMessage(
          "Account created successfully! Redirecting to login..."
        );
        setError("");
        navigate("/");
      }
    } catch (err) {
      // If an error occurs, display the error message
      setError("Error creating user: " + err.message);
      setSuccessMessage(""); // Clear success message if there's an error
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h2>Create your account</h2><br /><br />
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className="group-btn">
            <button className="signup btn" type="submit">
              Sign Up
            </button>
            <Link to={"/"}>
              <button className="login btn">Login</button>
            </Link>
          </div>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
      </div>
    </div>
  );
};

export default Signup;
