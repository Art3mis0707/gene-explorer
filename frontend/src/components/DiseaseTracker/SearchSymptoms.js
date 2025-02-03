import React, { useState } from "react";
import styles from "./SearchSymptoms.module.css";

const diseaseSymptoms = {
    "Diabetes": ["Increased thirst", "Frequent urination", "Fatigue"],
    "Influenza": ["Fever", "Cough", "Fatigue"],
    "Asthma": ["Shortness of breath", "Wheezing", "Coughing"],
    "COVID-19": ["Fever", "Cough", "Loss of taste or smell"]
};

const SearchSymptoms = () => {
    const [inputSymptoms, setInputSymptoms] = useState("");
    const [matchedDiseases, setMatchedDiseases] = useState([]);

    const handleSearch = () => {
        const symptomsArray = inputSymptoms.split(",").map(symptom => symptom.trim().toLowerCase());
        const matches = Object.entries(diseaseSymptoms).filter(([disease, symptoms]) =>
            symptomsArray.some(symptom => symptoms.map(s => s.toLowerCase()).includes(symptom))
        ).map(([disease]) => disease);

        setMatchedDiseases(matches);
    };

    return (
        <div className={styles.container}>
            <h2>Search for Symptoms</h2>
            <input
                type="text"
                placeholder="Enter symptoms (comma-separated)..."
                value={inputSymptoms}
                onChange={(e) => setInputSymptoms(e.target.value)}
                className={styles.searchBox}
            />
            <button onClick={handleSearch} className={styles.searchButton}>Find Diseases</button>

            <div className={styles.results}>
                {matchedDiseases.length > 0 ? matchedDiseases.map((disease, index) => (
                    <div key={index} className={styles.resultCard}>
                        <h3>{disease}</h3>
                    </div>
                )) : <p className={styles.noResults}>No matching diseases found.</p>}
            </div>
        </div>
    );
};

export default SearchSymptoms;
