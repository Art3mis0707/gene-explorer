import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(""); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Save JWT in localStorage
        localStorage.setItem("token", data.token);
        alert("Login successful!");
        // ✅ Redirect to home page after login
        navigate("/");
      } else {
        setError(data.error || "Login failed.");
      }
    } catch (err) {
      setError("Server error. Please try again later.");
      console.error(err);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.loginPage}>
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Gene Explorer</h1>
        </div>
        <nav className={styles.nav}>
          <button onClick={handleHomeClick} className={styles.homeButton}>
            Back to Home page
          </button>
        </nav>
      </header>

      <div className={styles.loginForm}>
        <h2>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className={styles.loginButton}>
          Login
        </button>
      </div>

      <footer className={styles.footer}>
        <p>&copy; 2025 Gene Explorer. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
