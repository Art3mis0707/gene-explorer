// src/components/UserManagement/Login.js
import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    onLogin({ username, password });
  };

  const navigate = useNavigate();

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
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2024 Gene Explorer. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Login;
