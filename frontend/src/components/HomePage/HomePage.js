import React from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
    const navigate = useNavigate();

    const handleLoginClick = () => {
        navigate("/login");
    };

    const handleRegisterClick = () => {
        navigate("/register");
    };

    return (
        <div className={styles.homepage}>
            {/* Header */}
            <header className={styles.header}>
                <div className={styles.logo}>
                    <h1>Gene Explorer</h1>
                </div>
                <nav className={styles.nav}>
                    <ul>
                        <li>
                            <button onClick={handleRegisterClick} className={styles.loginButton}>
                                Register
                            </button>
                        </li>
                        <li>
                            <button onClick={handleLoginClick} className={styles.loginButton}>
                                Login
                            </button>
                        </li>
                    </ul>

                </nav>
            </header>

            {/* Main Content */}
            <main className={styles.main}>
                <h2>Welcome to Gene Explorer</h2>
                <p>
                    Explore detailed information about genes, proteins, and their related diseases.
                    Navigate through our tools to visualize, analyze, and discover insights!
                </p>
                
                <div className={styles.features}>
                <div className={styles.featureCard}>
                        <h3>Organisms</h3>
                        <p>Explore organisms' genetics, their role in evolution and disease, and related research.</p>
                        <Link to="/organisms/genes" className={styles.featureLink}>
                        Explore Organism Genes
                        </Link>
                        <Link to="/organisms/research" className={styles.featureLink}>
                        Explore Research on Organisms
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Gene Details</h3>
                        <p>Get insights into genes and their relationships with proteins and diseases.</p>
                        <Link to="/genes/viewer" className={styles.featureLink}>
                            Explore Gene Viewer
                        </Link>
                        <Link to="/genes/related-diseases" className={styles.featureLink}>
                            Explore Related Diseases
                        </Link>
                        <Link to="/genes/related-proteins" className={styles.featureLink}>
                            Explore Related Proteins
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Protein Explorer</h3>
                        <p>Analyze proteins in detail, including their structures, functions, interactions, and related data.</p>
                        <Link to="/proteins/details" className={styles.featureLink}>
                            Explore Protein Details
                        </Link>
                        <Link to="/proteins/function-prediction" className={styles.featureLink}>
                            Explore Protein Functions
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Disease Tracker</h3>
                        <p>Track various diseases, search symptoms efficiently, and get detailed health insights.</p>
                        <Link to="/diseases/tracker" className={styles.featureLink}>
                            Explore Disease Tracker
                        </Link>
                        <Link to="/diseases/search-symptoms" className={styles.featureLink}>
                            Search for symptoms
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Research Articles</h3>
                        <p>Browse and read the latest research articles in bioinformatics.</p>
                        <Link to="/research/details" className={styles.featureLink}>
                            Explore Research Articles
                        </Link>
                        <Link to="/research/list" className={styles.featureLink}>
                            Articles List
                        </Link>
                    </div>
                    
                </div>
            </main>

            {/* Footer */}
            <footer className={styles.footer}>
                <p>&copy; 2024 Gene Explorer. All Rights Reserved.</p>
            </footer>
        </div>
    );
};

export default HomePage;