// src/components/GeneDetails/RelatedDiseases.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedDiseases.module.css";

const RelatedDiseases = () => {
    return (
        <div className={styles.page}>
            <header className={styles.header}>
                <h1>Related Diseases</h1>
                <Link to="/" className={styles.backButton}>Back to Home page</Link>
            </header>
            <main className={styles.main}>
                <p>
                    Explore diseases linked to this gene, including their symptoms, causes, and research articles.
                </p>
                <ul className={styles.diseaseList}>
                    <li>1. Disease A: <strong>Symptoms</strong>: Fatigue, Fever</li>
                    <li>2. Disease B: <strong>Causes</strong>: Genetic Mutation</li>
                    <li>3. Disease C: <strong>Treatment</strong>: Medication X</li>
                </ul>
            </main>
        </div>
    );
};

export default RelatedDiseases;