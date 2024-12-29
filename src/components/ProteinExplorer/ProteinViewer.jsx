// src/components/ProteinExplorer/ProteinViewer.jsx
import React from "react";
import Protein3DViewer from "./Protein3DViewer";

const ProteinViewer = () => {
  const sampleProteinStructure = `
ATOM      1  N   MET A   1      38.277  45.321  36.535  1.00 50.69           N
ATOM      2  CA  MET A   1      37.353  46.479  36.599  1.00 50.48           C
ATOM      3  C   MET A   1      35.888  46.045  36.798  1.00 50.63           C
ATOM      4  O   MET A   1      35.142  46.843  36.525  1.00 51.28           O
... (Add more PDB data here)
`;

  return (
    <div>
      <h1>Protein Viewer</h1>
      <Protein3DViewer proteinStructure={sampleProteinStructure} />
    </div>
  );
};

export default ProteinViewer;
