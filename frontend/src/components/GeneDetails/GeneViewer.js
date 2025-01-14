// src/components/GeneDetails/GeneViewer.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import styles from "./GeneViewer.module.css";

const GeneViewer = () => {
  const [geneSequence, setGeneSequence] = useState("");
  const [analysis, setAnalysis] = useState(null);

  // Function to analyze the gene sequence
  const analyzeGene = () => {
    const counts = {
      A: 0,
      T: 0,
      G: 0,
      C: 0,
    };

    for (let base of geneSequence.toUpperCase()) {
      if (counts[base] !== undefined) {
        counts[base]++;
      }
    }

    const totalBases = counts.A + counts.T + counts.G + counts.C;
    const ratios = {
      A: ((counts.A / totalBases) * 100).toFixed(2) + "%",
      T: ((counts.T / totalBases) * 100).toFixed(2) + "%",
      G: ((counts.G / totalBases) * 100).toFixed(2) + "%",
      C: ((counts.C / totalBases) * 100).toFixed(2) + "%",
    };

    setAnalysis({
      counts,
      totalBases,
      ratios,
      reverseComplement: getReverseComplement(geneSequence),
      rnaSequence: transcribeToRNA(geneSequence),
    });
  };

  // Helper functions
  const getReverseComplement = (sequence) => {
    const complement = { A: "T", T: "A", G: "C", C: "G" };
    return sequence
      .split("")
      .reverse()
      .map((base) => complement[base] || base)
      .join("");
  };

  const transcribeToRNA = (sequence) => sequence.replace(/T/g, "U");

  // const highlightCodons = (sequence) =>
  //   sequence.replace(/(AUG|UAA|UAG|UGA)/g, "<span class='highlight'>$1</span>");

  const mutateSequence = () => {
    const bases = ["A", "T", "G", "C"];
    const mutated = geneSequence
      .split("")
      .map((base) =>
        Math.random() < 0.1 ? bases[Math.floor(Math.random() * 4)] : base
      )
      .join("");
    setGeneSequence(mutated);
  };

  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.text("Gene Analysis Results", 10, 10);
    doc.text(`Total Bases: ${analysis.totalBases}`, 10, 20);
    doc.text(`Base Counts:`, 10, 30);
    doc.text(`  A: ${analysis.counts.A}`, 10, 40);
    doc.text(`  T: ${analysis.counts.T}`, 10, 50);
    doc.text(`  G: ${analysis.counts.G}`, 10, 60);
    doc.text(`  C: ${analysis.counts.C}`, 10, 70);
    doc.text(`Base Ratios:`, 10, 80);
    doc.text(`  A: ${analysis.ratios.A}`, 10, 90);
    doc.text(`  T: ${analysis.ratios.T}`, 10, 100);
    doc.text(`  G: ${analysis.ratios.G}`, 10, 110);
    doc.text(`  C: ${analysis.ratios.C}`, 10, 120);
    doc.save("gene_analysis.pdf");
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>Gene Viewer</h1>
        <Link to="/" className={styles.backButton}>
          Back to Home page
        </Link>
      </header>
      <main className={styles.main}>
        <p>
          Visualize and explore detailed gene sequences. Enter a gene sequence
          below to analyze the structure and basic statistics.
        </p>
        <div className={styles.inputContainer}>
          <textarea
            className={styles.textarea}
            placeholder="Enter your gene sequence here (e.g., ATGCGTAACGGT)..."
            value={geneSequence}
            onChange={(e) => setGeneSequence(e.target.value)}
          />
          <button className={styles.button} onClick={analyzeGene}>
            Analyze Gene
          </button>
          <button className={styles.button} onClick={mutateSequence}>
            Simulate Mutation
          </button>
        </div>

        {analysis && (
          <div className={styles.results}>
            <h2>Gene Analysis Results</h2>
            <p>
              <strong>Total Bases:</strong> {analysis.totalBases}
            </p>
            <p>
              <strong>Base Counts:</strong>
            </p>
            <ul>
              <li>A: {analysis.counts.A}</li>
              <li>T: {analysis.counts.T}</li>
              <li>G: {analysis.counts.G}</li>
              <li>C: {analysis.counts.C}</li>
            </ul>

            Gagana, [12/29/24 1:55 PM]
            <p>
              <strong>Base Ratios:</strong>
            </p>
            <ul>
              <li>A: {analysis.ratios.A}</li>
              <li>T: {analysis.ratios.T}</li>
              <li>G: {analysis.ratios.G}</li>
              <li>C: {analysis.ratios.C}</li>
            </ul>
            <p>
              <strong>Reverse Complement:</strong> {analysis.reverseComplement}
            </p>
            <p>
              <strong>RNA Sequence:</strong> {analysis.rnaSequence}
            </p>
            <button className={styles.button} onClick={exportToPDF}>
              Export to PDF
            </button>
            <div className={styles.chartContainer}>
              <Pie
                data={{
                  labels: ["A", "T", "G", "C"],
                  datasets: [
                    {
                      data: [
                        analysis.counts.A,
                        analysis.counts.T,
                        analysis.counts.G,
                        analysis.counts.C,
                      ],
                      backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
                    },
                  ],
                }}
              />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default GeneViewer;