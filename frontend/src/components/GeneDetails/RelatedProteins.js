// src/components/GeneDetails/RelatedProteins.js
import React from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedProteins.module.css";

const RelatedProteins = () => {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Related Proteins</h1>
        <Link to="/" className={styles.backButton}>Back to Home page</Link>
      </header>
      <main className={styles.main}>
        <p>
          View proteins associated with this gene and their biological significance.
        </p>
        <table className={styles.proteinTable}>
          <thead>
            <tr>
              <th>Protein Name</th>
              <th>Function</th>
              <th>Structure</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Protein X</td>
              <td>Enzymatic Activity</td>
              <td>Helical</td>
            </tr>
            <tr>
              <td>Protein Y</td>
              <td>Signal Transduction</td>
              <td>Globular</td>
            </tr>
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default RelatedProteins;