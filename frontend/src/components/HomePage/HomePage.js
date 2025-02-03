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
                        <p>Analyze proteins in detail, including their structures and related data.</p>
                        <Link to="/proteins/details" className={styles.featureLink}>
                            Explore Protein Details
                        </Link>
                        <Link to="/proteins/function-prediction" className={styles.featureLink}>
                            Explore protein functions
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Disease Analysis</h3>
                        <p>Track diseases, analyze risks, and search symptoms.</p>
                        <Link to="/diseases/tracker" className={styles.featureLink}>
                            Disease Tracker
                        </Link>
                        <Link to="/diseases/search-symptoms" className={styles.featureLink}>
                            Search Symptoms
                        </Link>
                        <Link to="/diseases/breast-cancer-risk" className={styles.featureLink}>
                            Breast Cancer Risk Assessment
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Research Articles</h3>
                        <p>Browse and read the latest research articles in bioinformatics.</p>
                        <Link to="/articles/list" className={styles.featureLink}>
                            Explore Research Articles
                        </Link>
                    </div>
                    <div className={styles.featureCard}>
                        <h3>Analytics Tools</h3>
                        <p>Visualize and analyze genetic and disease data.</p>
                        <Link to="/analytics/gene-disease-graph" className={styles.featureLink}>
                            Gene-Disease Network
                        </Link>
                        <Link to="/analytics/mutation-timeline" className={styles.featureLink}>
                            Mutation Timeline
                        </Link>
                        <Link to="/analytics/organism-gene-tree" className={styles.featureLink}>
                            Organism Gene Tree
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