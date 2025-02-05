import React, { useState, useEffect } from "react";
import Select from "react-select";
import styles from "./SearchSymptoms.module.css";

const symptomOptions = [
  { value: "Fever", label: "Fever" },
  { value: "Cough", label: "Cough" },
  { value: "Fatigue", label: "Fatigue" },
  { value: "Headache", label: "Headache" },
  { value: "Shortness of breath", label: "Shortness of breath" },
  { value: "Nausea", label: "Nausea" },
  { value: "Dizziness", label: "Dizziness" },
  { value: "Blurred vision", label: "Blurred vision" },
  { value: "Memory loss", label: "Memory loss" },
  { value: "Chest pain", label: "Chest pain" },
  { value: "Night sweats", label: "Night sweats" },
  { value: "Weight loss", label: "Weight loss" },
];

const symptomFrequency = {
  Fever: 90,
  Cough: 85,
  Fatigue: 80,
  Headache: 75,
  "Shortness of breath": 70,
  Nausea: 65,
  Dizziness: 60,
  "Blurred vision": 55,
  "Memory loss": 50,
  "Chest pain": 45,
  "Night sweats": 40,
  "Weight loss": 35,
};

const SearchSymptoms = () => {
  // State to store the fetched diseases from the database
  const [diseasesData, setDiseasesData] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [matchingDiseases, setMatchingDiseases] = useState([]);

  useEffect(() => {
    // Fetch disease data from your API endpoint
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
      .catch((error) =>
        console.error("Error fetching disease data:", error)
      );
  }, []);

  const handleSymptomChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions.map((option) => option.value));
  };

  const searchDiseases = () => {
    if (selectedSymptoms.length === 0) return;
    // Filter the diseases using the selected symptoms
    const results = diseasesData.filter((disease) =>
      disease.symptoms.some((symptom) => selectedSymptoms.includes(symptom))
    );
    setMatchingDiseases(results);
  };

  return (
    <div className={styles.symptoms_container}>
      <h2>🔍 Search for Symptoms</h2>
      <p>Select symptoms to find possible diseases</p>

      <div className={styles.dropdownContainer}>
        <Select
          options={symptomOptions}
          isMulti
          className={styles.dropdown}
          placeholder="Select symptoms..."
          onChange={handleSymptomChange}
        />
      </div>

      <button className={styles.searchButton} onClick={searchDiseases}>
        Find Diseases
      </button>

      {matchingDiseases.length > 0 && (
        <div className={styles.results}>
          <h3>🩺 Possible Diseases</h3>
          <div className={styles.diseaseGrid}>
            {matchingDiseases.map((disease, index) => (
              <div
                key={index}
                className={`${styles.diseaseCard} ${styles[disease.risk.toLowerCase()]}`}
              >
                <h4>{disease.name}</h4>
                <p>
                  ⚠ <strong>Risk Level:</strong> {disease.risk}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      <h3>🔥 Symptom Heatmap</h3>
      <div className={styles.heatmap}>
        {Object.entries(symptomFrequency).map(([symptom, frequency]) => (
          <div
            key={symptom}
            className={styles.heatmapItem}
            style={{ backgroundColor: `rgba(255, 69, 0, ${frequency / 100})` }}
          >
            {symptom} ({frequency}%)
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchSymptoms;
