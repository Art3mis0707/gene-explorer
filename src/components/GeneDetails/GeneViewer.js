// src/components/GeneDetails/GeneViewer.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./GeneViewer.module.css";

const GeneViewer = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Gene Viewer</h1>
        <Link to="/" className={styles.backButton}>Back to Home page</Link>
      </header>
      <main className={styles.main}>
        <p>
          Visualize and explore detailed gene sequences. Use tools to analyze the structure and functions of genes.
        </p>
        <div className={styles.viewer}>
          <p><strong>Example:</strong> Gene Sequence: ATGCGTAACGGT...</p>
          <button className={styles.button}>Analyze Gene</button>
        </div>
      </main>
    </div>
  );
};

export default GeneViewer;