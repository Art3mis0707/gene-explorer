// src/components/ProteinExplorer/Protein3DViewer.js
import React, { useEffect } from "react";
import * as $3Dmol from "3dmol";
import styles from "./Protein3DViewer.module.css";

const Protein3DViewer = ({ proteinStructure }) => {
  useEffect(() => {
    if (!proteinStructure) return;

    const viewer = $3Dmol.createViewer("protein-3d", {
      backgroundColor: "#f5f5f5", // Light gray background
    });

    viewer.addModel(proteinStructure, "pdb");
    viewer.setStyle({}, { cartoon: { color: "spectrum" } }); // Cartoon style with spectrum colors
    viewer.zoomTo();
    viewer.render();
  }, [proteinStructure]);

  return (
    <div className={styles.container}>
      <h2>3D Protein Viewer</h2>
      <div
        id="protein-3d"
        className={styles.viewer}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default Protein3DViewer;
