// src/components/GeneDetails/GeneViewer.js
import React from 'react';

const GeneViewer = ({ gene }) => (
  <div className="gene-details">
    <h2>{gene.name} (ID: {gene.id})</h2>
    <p><strong>Chromosome:</strong> {gene.chromosome}</p>
    <p><strong>Length:</strong> {gene.length}</p>
    <p><strong>Sequence:</strong> {gene.sequence}</p>
  </div>
);

export default GeneViewer;
