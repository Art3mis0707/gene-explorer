// src/components/UserManagement/Register.js
import React, { useState } from "react";
import styles from "./Register.module.css";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    userId: "",
    password: "",
    userType: "User",
    affiliation: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5001/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await response.json();

      if (response.ok) {
        alert("Registration successful. You can now log in.");
        navigate("/login");
      } else {
        alert(data.error || "Registration failed.");
      }
    } catch (err) {
      alert("Server error. Please try again later.");
      console.error(err);
    }
  };

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <div className={styles.registerPage}>
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
      <h2>Register</h2>
      <div className={styles.registerFormContainer}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            User ID:
            <input
              type="text"
              name="userId"
              value={formData.userId}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            User Type:
            <select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              required
            >
              <option value="User">User</option>
              <option value="Researcher">Researcher</option>
            </select>
          </label>
          <label>
            Affiliation:
            <input
              type="text"
              name="affiliation"
              value={formData.affiliation}
              onChange={handleChange}
              required
            />
          </label>
          <button type="submit" className={styles.submitButton}>
            Register
          </button>
        </form>
      </div>
      <footer className={styles.footer}>
        <p>&copy; 2025 Gene Explorer. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default RegisterPage;
