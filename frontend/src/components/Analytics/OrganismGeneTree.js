// src/components/OrganismGeneTree.js
import React from "react";
import styles from "./OrganismGeneTree.module.css";

const OrganismGeneTree = ({ treeData }) => (
  <div className={styles.container}>
    <h2>Gene Tree</h2>
    <pre className={styles.tree}>{JSON.stringify(treeData, null, 2)}</pre>
  </div>
);

export default OrganismGeneTree;
