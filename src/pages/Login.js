import React, { useState } from "react";

import { Link, useNavigate } from "react-router-dom";

function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = () => {
    fetch("https://mark-be.onrender.com/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          localStorage.setItem("authToken", data.token);
          //onLogin();

          navigate("/");
        } else {
          alert("Invalid email or password");
        }
      })
      .catch((error) => {
        console.error("Error logging in: ", error);
      });
  };

  return (
    <div className="login-container">
      <div>
        <h2>Login</h2>
        <input
          className="login-email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="login-pswd"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button classname="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
      <Link to="/register" className="login-register">
        Do not have an account.
      </Link>
    </div>
  );
}
export default Login;