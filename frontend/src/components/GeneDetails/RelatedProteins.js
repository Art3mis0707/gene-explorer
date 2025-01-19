import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedProteins.module.css";
import { FaDna, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const proteinData = [
  {
    name: "Insulin",
    relatedGene: "Human Insulin Gene",
    function: "Regulates blood glucose levels by facilitating the uptake of glucose.",
    structure: "Globular",
    details: "Insulin is a peptide hormone critical for glucose metabolism. It signals cells to absorb glucose from the bloodstream.",
  },
  {
    name: "Lactase",
    relatedGene: "Lactase Gene",
    function: "Breaks down lactose into glucose and galactose in the digestive system.",
    structure: "Helical",
    details: "Lactase is an enzyme in the small intestine, enabling digestion of dairy products by hydrolyzing lactose.",
  },
  {
    name: "Hemoglobin",
    relatedGene: "Hemoglobin Beta Gene",
    function: "Transports oxygen in red blood cells from the lungs to body tissues.",
    structure: "Tetramer",
    details: "Hemoglobin is an iron-containing protein crucial for oxygen transport and plays a key role in respiration.",
  },
  {
    name: "BRCA1 Protein",
    relatedGene: "BRCA1 Gene",
    function: "Involved in DNA repair processes to maintain genomic stability.",
    structure: "Multi-domain",
    details: "BRCA1 protein plays a role in repairing double-strand breaks in DNA, helping prevent cancer development.",
  },
  {
    name: "EGFR Protein",
    relatedGene: "EGFR Gene",
    function: "A receptor involved in cell signaling for growth and differentiation.",
    structure: "Transmembrane",
    details: "EGFR is a transmembrane protein essential for cell communication and is often overexpressed in certain cancers.",
  },
  {
    name: "p53 Protein",
    relatedGene: "TP53 Tumor Suppressor Gene",
    function: "Regulates cell cycle and apoptosis to prevent tumor formation.",
    structure: "Tetramer",
    details: "p53 is often called the 'guardian of the genome' due to its role in preventing cancerous mutations.",
  },
  {
    name: "c-Myc",
    relatedGene: "MYC Proto-Oncogene",
    function: "Controls gene expression involved in cell growth and proliferation.",
    structure: "Helical",
    details: "c-Myc is a transcription factor implicated in many cancers due to its role in promoting cell division.",
  },
  {
    name: "CFTR Protein",
    relatedGene: "CFTR Gene (Cystic Fibrosis)",
    function: "Regulates chloride and water transport in cells.",
    structure: "Transmembrane",
    details: "CFTR mutations cause cystic fibrosis, leading to thick mucus in lungs and digestive issues.",
  },
  {
    name: "HLA-DQA1",
    relatedGene: "HLA-DQA1 Gene (Immune Response)",
    function: "Plays a role in presenting antigens to immune cells.",
    structure: "Heterodimer",
    details: "HLA-DQA1 is crucial for the adaptive immune response by presenting peptides to T-cells.",
  },
  {
    name: "KRAS Protein",
    relatedGene: "KRAS Oncogene",
    function: "Regulates cell signaling pathways for growth and differentiation.",
    structure: "Globular",
    details: "Mutations in KRAS often lead to unregulated cell growth, commonly found in cancers like lung and colorectal.",
  },
];

const RelatedProteins = () => {
  const [expandedRow, setExpandedRow] = useState(null);

  const toggleDetails = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>
          <FaDna /> Related Proteins
        </h1>
        <Link to="/" className={styles.backButton}>
          Back to Home Page
        </Link>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          Explore proteins associated with this gene, their biological significance, and structural details.
        </p>
        <table className={styles.proteinTable}>
          <thead>
            <tr>
              <th>Protein</th>
              <th>Related Gene</th>
              <th>Function</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {proteinData.map((protein, index) => (
              <React.Fragment key={index}>
                {/* Main Row */}
                <tr>
                  <td>{protein.name}</td>
                  <td>{protein.relatedGene}</td>
                  <td>{protein.function}</td>
                  <td>
                    <button
                      onClick={() => toggleDetails(index)}
                      className={styles.detailsButton}
                    >
                      {expandedRow === index ? (
                        <>
                          Hide Details <FaChevronUp />
                        </>
                      ) : (
                        <>
                          View Details <FaChevronDown />
                        </>
                      )}
                    </button>
                  </td>
                </tr>

                {/* Expanded Row for Details */}
                {expandedRow === index && (
                  <tr className={styles.expandedRow}>
                    <td colSpan="4">
                      <div className={styles.detailsContent}>
                        <p>
                          <FaInfoCircle /> {protein.details}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default RelatedProteins;
