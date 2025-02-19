import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './ProteinFunctionPrediction.module.css';

const proteinFunctions = {
  "Globular": [
    { function: "Enzyme", description: "Globular enzymes like Amylase or Lipase catalyze biochemical reactions." },
    { function: "Transport", description: "Globular transport proteins like Hemoglobin carry molecules such as oxygen in the bloodstream." },
    { function: "Receptor", description: "Receptor proteins like Insulin Receptor are involved in cellular signaling and response." }
  ],
  "Fibrous": [
    { function: "Structural", description: "Fibrous proteins like Collagen provide structural support to tissues like skin, cartilage, and bones." },
    { function: "Motility", description: "Fibrous proteins like Actin are involved in cell movement and muscle contraction." },
    { function: "Support", description: "Fibrous proteins like Keratin are structural and protective, found in hair, nails, and skin." }
  ],
  "Filamentous": [
    { function: "Contractile", description: "Filamentous proteins like Myosin are responsible for muscle contraction and cell movement." },
    { function: "Movement", description: "Filamentous proteins like Tubulin form microtubules, essential for intracellular transport and ciliary movement." }
  ],
  "Helical": [
    { function: "Enzyme", description: "Helical proteins like ATP Synthase catalyze the production of ATP, the cell's energy source." },
    { function: "Energy Production", description: "Proteins involved in energy production like Cytochrome C participate in the electron transport chain." }
  ],
  "Membrane": [
    { function: "Ion Channel", description: "Membrane proteins like Sodium-Potassium Pump help regulate ion gradients across membranes." },
    { function: "Receptor", description: "Membrane receptors like G-protein coupled receptors (GPCRs) are involved in signaling pathways." },
    { function: "Transport", description: "Membrane transporters like GLUT facilitate glucose movement across cell membranes." }
  ],
  "Intrinsically Disordered": [
    { function: "Signaling", description: "Intrinsically disordered proteins (IDPs) like p53 play a role in cellular signaling and stress response." },
    { function: "Regulation", description: "IDPs like Tau regulate other proteins, often through binding and folding upon interaction." }
  ],
  "Glycoproteins": [
    { function: "Cell-Cell Recognition", description: "Glycoproteins like Cadherins are involved in cell adhesion and recognition." },
    { function: "Immune Response", description: "Glycoproteins like Antibodies play an essential role in the immune system's response to foreign invaders." }
  ],
  "Lipids": [
    { function: "Energy Storage", description: "Lipids like Triglycerides store energy in adipose tissue for later use." },
    { function: "Signaling", description: "Lipids like Steroids act as hormones and signaling molecules in the body." }
  ]
};

const ProteinFunctionPrediction = () => {
  const [stability, setStability] = useState(50);
  const [hydrophobicity, setHydrophobicity] = useState(50);
  const [activity, setActivity] = useState(50);
  const [structureType, setStructureType] = useState("Globular");
  const [predictedFunction, setPredictedFunction] = useState("");
  const [predictedDescription, setPredictedDescription] = useState("");

  const handlePrediction = () => {
    let functionPredicted = "";
    let description = "";

    // Logic for predicting functions based on structure type and scores
    if (proteinFunctions[structureType]) {
      const proteinCategory = proteinFunctions[structureType];
      const prediction = proteinCategory.find(item => {
        // Make predictions based on the input parameters
        return (stability > 70 || hydrophobicity < 60 || activity > 60);
      });

      if (prediction) {
        functionPredicted = prediction.function;
        description = prediction.description;
      }
    }

    setPredictedFunction(functionPredicted);
    setPredictedDescription(description);
  };

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
      <h2>Protein Function Prediction</h2>

      <div className={styles.inputContainer}>
        <label>Stability (0-100):</label>
        <input
          type="range"
          min="0"
          max="100"
          value={stability}
          onChange={(e) => setStability(e.target.value)}
        />
        <span>{stability}</span>
      </div>

      <div className={styles.inputContainer}>
        <label>Hydrophobicity (0-100):</label>
        <input
          type="range"
          min="0"
          max="100"
          value={hydrophobicity}
          onChange={(e) => setHydrophobicity(e.target.value)}
        />
        <span>{hydrophobicity}</span>
      </div>

      <div className={styles.inputContainer}>
        <label>Activity (0-100):</label>
        <input
          type="range"
          min="0"
          max="100"
          value={activity}
          onChange={(e) => setActivity(e.target.value)}
        />
        <span>{activity}</span>
      </div>

      <div className={styles.inputContainer}>
        <label>Structure Type:</label>
        <select value={structureType} onChange={(e) => setStructureType(e.target.value)}>
          <option value="Globular">Globular</option>
          <option value="Fibrous">Fibrous</option>
          <option value="Filamentous">Filamentous</option>
          <option value="Helical">Helical</option>
          <option value="Membrane">Membrane</option>
          <option value="Intrinsically Disordered">Intrinsically Disordered</option>
          <option value="Glycoproteins">Glycoproteins</option>
          <option value="Lipids">Lipids</option>
        </select>
      </div>

      <button className={styles.predictButton} onClick={handlePrediction}>
        Predict Function
      </button>

      {predictedFunction && (
        <div className={styles.result}>
          <h3>Predicted Protein Function:</h3>
          <p>{predictedFunction}</p>
          <p>{predictedDescription}</p>
        </div>
      )}
    </div>
  );
};

export default ProteinFunctionPrediction;
