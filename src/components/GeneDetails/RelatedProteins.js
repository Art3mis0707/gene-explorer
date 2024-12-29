// src/components/ProteinExplorer/RelatedProteins.js
import React from "react";
import styles from "./RelatedProteins.module.css"; // Ensure this CSS file is in the same folder

const RelatedProteins = ({ proteins }) => (
  <div className={styles.container}>
    <h2>Related Proteins</h2>
    <ul>
      {proteins.map((protein) => (
        <li key={protein.id}>
          <a href={`/protein/${protein.id}`} className={styles.link}>
            {protein.name}
          </a>
        </li>
      ))}
    </ul>
  </div>
);

export default RelatedProteins;
