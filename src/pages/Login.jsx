import React, { useState } from "react";
import { login } from "../firebase/auth";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await login(email, password);
      if (user) {
        navigate("/dashboard");
      } else {
        setError("User does not exist.");
      }
    } catch (err) {
      setError("Invalid email or password.");
    }
  };

  return (
    <div className="container">
      <div className="signup-container">
        <h2>Login</h2>
        <br />
        <br />
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
            <button className="login btn" type="submit">
              Login
            </button>
            {/* <Link to='/signup'><button className="signup btn">Signup</button></Link> */}
          </div>
          <br />
          <hr />
          <br />
          <p>
            Don't have an account yet?{" "}
            <Link to={'/signup'}><span style={{color:'#ec4862'}}>CREATE ONE NOW</span></Link>
          </p>
        </form>
        {error && <p>{error}</p>}
      </div>
    </div>
  );
};

export default Login;
