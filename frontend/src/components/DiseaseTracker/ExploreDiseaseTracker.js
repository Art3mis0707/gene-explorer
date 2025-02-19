import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ExploreDiseaseTracker.module.css";

const ExploreDiseaseTracker = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("All");
  const [diseasesData, setDiseasesData] = useState([]);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    // Fetch disease data from the new endpoint
    fetch("http://localhost:5001/api/diseases-data/all")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch disease data");
        }
        return res.json();
      })
      .then((data) => {
        setDiseasesData(data);
      })
      .catch((error) => console.error("Error fetching disease data:", error));
  }, []);

  const filteredDiseases = diseasesData.filter((disease) =>
    (filter === "All" || disease.category === filter) &&
    disease.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={styles.tracker_container}>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
      <h2>Explore Disease Tracker</h2>
      <input
        type="text"
        placeholder="Search diseases..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={styles.searchBox}
      />
      <select
        onChange={(e) => setFilter(e.target.value)}
        className={styles.filterDropdown}
      >
        <option value="All">All</option>
        <option value="Chronic">Chronic</option>
        <option value="Infectious">Infectious</option>
        <option value="Respiratory">Respiratory</option>
        <option value="Neurological">Neurological</option>
      </select>
      <div className={styles.diseaseList}>
        {filteredDiseases.map((disease, index) => (
          <div
            key={index}
            className={`${styles.diseaseCard} ${styles[disease.risk.toLowerCase()]}`}
            onClick={() => setExpanded(expanded === index ? null : index)}
          >
            <h3>
              {disease.name}{" "}
              {disease.risk === "Mild"
                ? "🟢"
                : disease.risk === "Moderate"
                ? "🟡"
                : "🔴"}
            </h3>
            <p>
              <strong>Category:</strong> {disease.category}
            </p>
            {expanded === index && (
              <div className={styles.expandedContent}>
                <p>
                  <strong>Symptoms:</strong>{" "}
                  {Array.isArray(disease.symptoms)
                    ? disease.symptoms.join(", ")
                    : disease.symptoms}
                </p>
                <p>
                  <strong>Cause:</strong> {disease.cause}
                </p>
                <p>
                  <strong>Prevention:</strong> {disease.prevention}
                </p>
                <p>
                  <strong>Treatment:</strong> {disease.treatment}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExploreDiseaseTracker;
