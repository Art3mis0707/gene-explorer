// src/components/MutationTimeline.js
import React from "react";
import styles from "./MutationTimeLine.module.css";

const MutationTimeline = ({ mutations }) => (
  <div className={styles.container}>
    <h2>Mutation Timeline</h2>
    <ul>
      {mutations.map((mutation, index) => (
        <li key={index} className={styles.mutation}>
          <strong>{mutation.date}</strong>: {mutation.description}
        </li>
      ))}
    </ul>
  </div>
);

export default MutationTimeline;
