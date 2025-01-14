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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Form Submitted:", formData);
        // Handle form submission logic here
    };

    const navigate = useNavigate();

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
                <p>&copy; 2024 Gene Explorer. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default RegisterPage;