import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedDiseases.module.css";
import { FaDna, FaDisease } from "react-icons/fa";

// Extended data for genes and their related diseases
const geneData = [
  {
    name: "Human Insulin Gene",
    sequence: "ATGCCCTCTTGCAGTTTTTTCTG",
    diseases: [
      {
        name: "Diabetes Mellitus Type 1",
        description: "An autoimmune condition where the pancreas produces little or no insulin.",
      },
      {
        name: "Diabetes Mellitus Type 2",
        description: "A metabolic disorder affecting blood sugar regulation.",
      },
    ],
  },
  {
    name: "Lactase Gene",
    sequence: "TGGCCATTAGCGTTCTCAGT",
    diseases: [
      {
        name: "Lactose Intolerance",
        description: "Inability to digest lactose in dairy products due to lactase deficiency.",
      },
    ],
  },
  {
    name: "Hemoglobin Beta Gene",
    sequence: "CACGTGTTTTGGGAGTTGTC",
    diseases: [
      {
        name: "Sickle Cell Disease",
        description: "A genetic blood disorder causing red blood cells to assume a sickle shape.",
      },
      {
        name: "Beta Thalassemia",
        description: "Reduced production of hemoglobin, leading to anemia.",
      },
    ],
  },
  {
    name: "BRCA1 Gene",
    sequence: "AAGTCACAGTAGCTGCCTGA",
    diseases: [
      {
        name: "Breast Cancer",
        description: "Inherited mutations in BRCA1 significantly increase breast cancer risk.",
      },
      {
        name: "Ovarian Cancer",
        description: "A cancer linked to BRCA1 mutations, affecting the ovaries.",
      },
    ],
  },
  {
    name: "CFTR Gene (Cystic Fibrosis)",
    sequence: "CTTGGAGCAGATGCTGTACC",
    diseases: [
      {
        name: "Cystic Fibrosis",
        description: "A hereditary condition causing severe damage to the lungs and digestive system.",
      },
    ],
  },
  {
    name: "APOE Gene",
    sequence: "GAGGGAGGCAAACTGACTGC",
    diseases: [
      {
        name: "Alzheimer's Disease",
        description: "APOE gene variants are associated with an increased risk of Alzheimer's.",
      },
    ],
  },
  {
    name: "EGFR Gene",
    sequence: "CTGAGTGGAGATCGTCCTGC",
    diseases: [
      {
        name: "Lung Cancer",
        description: "EGFR mutations are often found in non-small cell lung cancer.",
      },
    ],
  },
  {
    name: "TP53 Tumor Suppressor Gene",
    sequence: "AGCTACGGCGGTGTGACCGT",
    diseases: [
      {
        name: "Li-Fraumeni Syndrome",
        description: "A rare hereditary disorder associated with an increased cancer risk.",
      },
    ],
  },
  // Add additional genes as needed
];

const RelatedDiseases = () => {
  const [selectedGene, setSelectedGene] = useState(null);
  const [expandedDiseases, setExpandedDiseases] = useState({});

  const handleGeneSelect = (gene) => {
    setSelectedGene(gene);
    setExpandedDiseases({});
  };

  const toggleDiseaseDetails = (index) => {
    setExpandedDiseases((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>
          <FaDna /> Related Diseases
        </h1>
        <Link to="/" className={styles.backButton}>
          Back to Home Page
        </Link>
      </header>
      <main className={styles.main}>
        <section className={styles.geneList}>
          <h2>Select a Gene</h2>
          <ul>
            {geneData.map((gene, index) => (
              <li
                key={index}
                className={`${styles.geneItem} ${selectedGene === gene ? styles.activeGene : ""}`}
                onClick={() => handleGeneSelect(gene)}
              >
                {gene.name}
              </li>
            ))}
          </ul>
        </section>

        {selectedGene ? (
          <section className={styles.diseaseDetails}>
            <h2>
              <FaDna /> Gene: {selectedGene.name}
            </h2>
            <p>
              <strong>Sequence:</strong>{" "}
              <span className={styles.geneSequence}>{selectedGene.sequence}</span>
            </p>
            <h3>Related Diseases</h3>
            <ul>
              {selectedGene.diseases.map((disease, index) => (
                <li key={index} className={styles.diseaseItem}>
                  <h4 onClick={() => toggleDiseaseDetails(index)} className={styles.diseaseHeader}>
                    <FaDisease /> {disease.name}
                  </h4>
                  {expandedDiseases[index] && <p className={styles.diseaseDescription}>{disease.description}</p>}
                </li>
              ))}
            </ul>
          </section>
        ) : (
          <p className={styles.instruction}>Please select a gene to view its related diseases.</p>
        )}
      </main>
    </div>
  );
};

export default RelatedDiseases;
