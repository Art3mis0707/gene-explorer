import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import jsPDF from "jspdf";
import styles from "./GeneViewer.module.css";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const GeneViewer = () => {
  const [geneSequence, setGeneSequence] = useState("");
  const [analysis, setAnalysis] = useState(null);

  const predefinedSequences = [
    { name: "Human Insulin Gene", sequence: "ATGCCCTCTTGCAGTTTTTTCTG" },
    { name: "Lactase Gene", sequence: "TGGCCATTAGCGTTCTCAGT" },
    { name: "Hemoglobin Beta Gene", sequence: "CACGTGTTTTGGGAGTTGTC" },
    { name: "BRCA1 Gene", sequence: "AAGTCACAGTAGCTGCCTGA" },
    { name: "EGFR Gene", sequence: "CTGAGTGGAGATCGTCCTGC" },
    { name: "TP53 Tumor Suppressor Gene", sequence: "AGCTACGGCGGTGTGACCGT" },
    { name: "MYC Proto-Oncogene", sequence: "GTGAACCGTCCTCGGATTAC" },
    { name: "HBB Sickle Cell Mutation", sequence: "CACGTGTTTTGGGAGTCATC" }, // Hemoglobin beta with mutation
    { name: "CFTR Gene (Cystic Fibrosis)", sequence: "CTTGGAGCAGATGCTGTACC" },
    { name: "HLA-DQA1 Gene (Immune Response)", sequence: "TGGAGGGATCTGTGACTGTC" },
    { name: "KRAS Oncogene", sequence: "GGCGGCCTGCTGAAAATGAC" },
    { name: "APOE Gene (Alzheimer's Risk)", sequence: "GAGGGAGGCAAACTGACTGC" },
    { name: "VEGFA Gene (Angiogenesis)", sequence: "TGCGGATGCCGTCACCAAGA" },
    { name: "CYP2D6 (Drug Metabolism)", sequence: "CGTCTGAGTACACGGCCACT" },
    { name: "ACTB (Beta-Actin Gene)", sequence: "CCACACCCGCCACCGCCCTC" },
  ];
  

  // Helper functions
  const analyzeGene = () => {
    if (!geneSequence.trim()) {
      alert("Please enter or select a gene sequence!");
      return;
    }
  
    // Validate gene sequence
    const isValidSequence = /^[ATGC]+$/i.test(geneSequence.trim());
    if (!isValidSequence) {
      alert("Invalid gene sequence! A valid sequence can only contain A, T, G, and C.");
      return;
    }
  
    const counts = { A: 0, T: 0, G: 0, C: 0 };
  
    for (let base of geneSequence.toUpperCase()) {
      if (counts[base] !== undefined) {
        counts[base]++;
      }
    }
  
    const totalBases = counts.A + counts.T + counts.G + counts.C;
    if (totalBases === 0) {
      alert("Invalid gene sequence. Please check your input.");
      return;
    }
  
    setAnalysis({
      counts,
      totalBases,
      ratios: calculateRatios(counts, totalBases),
      reverseComplement: getReverseComplement(geneSequence),
      rnaSequence: transcribeToRNA(geneSequence),
    });
  };
  

  const calculateRatios = (counts, totalBases) => ({
    A: ((counts.A / totalBases) * 100).toFixed(2) + "%",
    T: ((counts.T / totalBases) * 100).toFixed(2) + "%",
    G: ((counts.G / totalBases) * 100).toFixed(2) + "%",
    C: ((counts.C / totalBases) * 100).toFixed(2) + "%",
  });

  const getReverseComplement = (sequence) => {
    const complement = { A: "T", T: "A", G: "C", C: "G" };
    return sequence
      .toUpperCase()
      .split("")
      .reverse()
      .map((base) => complement[base] || base)
      .join("");
  };

  const transcribeToRNA = (sequence) =>
    sequence.toUpperCase().replace(/T/g, "U");

  const mutateSequence = () => {
    const bases = ["A", "T", "G", "C"];
    const mutated = geneSequence
      .toUpperCase()
      .split("")
      .map((base) =>
        Math.random() < 0.1 ? bases[Math.floor(Math.random() * 4)] : base
      )
      .join("");
    setGeneSequence(mutated);
  };

  const exportToPDF = () => {
    if (!analysis) return;
    const doc = new jsPDF();
    doc.text("Gene Analysis Results", 10, 10);
    doc.text(`Total Bases: ${analysis.totalBases}`, 10, 20);
    doc.text(`Base Counts:`, 10, 30);
    Object.keys(analysis.counts).forEach((key, index) => {
      doc.text(`  ${key}: ${analysis.counts[key]}`, 10, 40 + index * 10);
    });
    doc.text(`Base Ratios:`, 10, 80);
    Object.keys(analysis.ratios).forEach((key, index) => {
      doc.text(`  ${key}: ${analysis.ratios[key]}`, 10, 90 + index * 10);
    });
    doc.save("gene_analysis.pdf");
  };

  // JSX Structure
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1 className={styles.title}>Gene Viewer</h1>
        <Link to="/" className={styles.backButton}>
          Back to Home
        </Link>
      </header>

      <main className={styles.main}>
        <p className={styles.description}>
          Analyze and visualize gene sequences. Enter a custom sequence or
          choose from predefined ones to explore detailed insights.
        </p>

        <div className={styles.inputContainer}>
          <select
            className={styles.dropdown}
            onChange={(e) =>
              setGeneSequence(predefinedSequences[e.target.value]?.sequence || "")
            }
            defaultValue="" // Ensures the placeholder is selected initially
          >
            <option value="" disabled hidden>
              Select a predefined gene sequence
            </option>
            {predefinedSequences.map((item, index) => (
              <option key={index} value={index}>
                {item.name}
              </option>
            ))}
          </select>
          <textarea
            className={styles.textarea}
            placeholder="Enter your gene sequence here..."
            value={geneSequence}
            onChange={(e) => setGeneSequence(e.target.value)}
          />
          <div className={styles.buttonContainer}>
            <button className={styles.button} onClick={analyzeGene}>
              Analyze Gene
            </button>
            <button className={styles.button} onClick={mutateSequence}>
              Simulate Mutation
            </button>
          </div>
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
              {Object.keys(analysis.counts).map((key) => (
                <li key={key}>
                  {key}: {analysis.counts[key]}
                </li>
              ))}
            </ul>
            <p>
              <strong>Base Ratios:</strong>
            </p>
            <ul>
              {Object.keys(analysis.ratios).map((key) => (
                <li key={key}>
                  {key}: {analysis.ratios[key]}
                </li>
              ))}
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
