import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedDiseases.module.css";
import { FaDna, FaDisease } from "react-icons/fa";

const RelatedDiseases = () => {
  const [genes, setGenes] = useState([]);
  const [diseases, setDiseases] = useState([]);
  const [selectedGene, setSelectedGene] = useState(null);
  const [expandedDiseases, setExpandedDiseases] = useState({});

  useEffect(() => {
    fetch("http://localhost:5001/api/genes/related-diseases")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch gene data");
        }
        return res.json();
      })
      .then((data) => {
        console.log("Fetched data:", data);
        // Set state based on the returned object
        setGenes(data.genes || []);
        setDiseases(data.diseases || []);
      })
      .catch((error) => console.error("Error fetching gene data:", error));
  }, []);

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

  // Filter diseases that match the selected gene's ID
  const diseasesForSelectedGene = selectedGene
    ? diseases.filter((d) => d.gene_id === selectedGene.id)
    : [];

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
          {genes.length > 0 ? (
            <ul>
              {genes.map((gene) => (
                <li
                  key={gene.id}
                  className={`${styles.geneItem} ${
                    selectedGene && selectedGene.id === gene.id ? styles.activeGene : ""
                  }`}
                  onClick={() => handleGeneSelect(gene)}
                >
                  {gene.name}
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading genes...</p>
          )}
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
              {diseasesForSelectedGene.length > 0 ? (
                diseasesForSelectedGene.map((disease, index) => (
                  <li key={disease.id} className={styles.diseaseItem}>
                    <h4
                      onClick={() => toggleDiseaseDetails(index)}
                      className={styles.diseaseHeader}
                    >
                      <FaDisease /> {disease.name}
                    </h4>
                    {expandedDiseases[index] && (
                      <p className={styles.diseaseDescription}>
                        {disease.description}
                      </p>
                    )}
                  </li>
                ))
              ) : (
                <p>No related diseases found for this gene.</p>
              )}
            </ul>
          </section>
        ) : (
          <p className={styles.instruction}>
            Please select a gene to view its related diseases.
          </p>
        )}
      </main>
    </div>
  );
};

export default RelatedDiseases;
