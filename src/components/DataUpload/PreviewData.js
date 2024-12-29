// src/components/PreviewData.js
import React from "react";
import styles from "./PreviewData.module.css";

const PreviewData = ({ data }) => (
  <div className={styles.container}>
    <h2>Data Preview</h2>
    <table className={styles.table}>
      <thead>
        <tr>
          {Object.keys(data[0]).map((key) => (
            <th key={key}>{key}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>
            {Object.values(row).map((value, i) => (
              <td key={i}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default PreviewData;
