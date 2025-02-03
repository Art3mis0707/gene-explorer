import React, { useState } from "react";
import Select from "react-select";
import styles from "./SearchSymptoms.module.css";

const diseaseDatabase = [
    { name: "Diabetes", symptoms: ["Increased thirst", "Frequent urination", "Fatigue"], risk: "Moderate" },
    { name: "Influenza", symptoms: ["Fever", "Cough", "Fatigue"], risk: "Mild" },
    { name: "Asthma", symptoms: ["Shortness of breath", "Wheezing"], risk: "Moderate" },
    { name: "Hypertension", symptoms: ["Headache", "Dizziness", "Blurred vision"], risk: "Moderate" },
    { name: "Alzheimer's", symptoms: ["Memory loss", "Confusion", "Difficulty speaking"], risk: "Severe" },
    { name: "COVID-19", symptoms: ["Fever", "Cough", "Loss of taste/smell"], risk: "Severe" },
    { name: "Tuberculosis", symptoms: ["Chronic cough", "Night sweats", "Weight loss"], risk: "Severe" },
    { name: "Migraine", symptoms: ["Severe headache", "Nausea", "Sensitivity to light"], risk: "Mild" },
    { name: "Pneumonia", symptoms: ["Cough", "Fever", "Chest pain"], risk: "Severe" },
];

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
    const [selectedSymptoms, setSelectedSymptoms] = useState([]);
    const [matchingDiseases, setMatchingDiseases] = useState([]);

    const handleSymptomChange = (selectedOptions) => {
        setSelectedSymptoms(selectedOptions.map(option => option.value));
    };

    const searchDiseases = () => {
        if (selectedSymptoms.length === 0) return;

        const results = diseaseDatabase.filter(disease =>
            disease.symptoms.some(symptom => selectedSymptoms.includes(symptom))
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

            <button className={styles.searchButton} onClick={searchDiseases}>Find Diseases</button>

            {matchingDiseases.length > 0 && (
                <div className={styles.results}>
                    <h3>🩺 Possible Diseases</h3>
                    <div className={styles.diseaseGrid}>
                        {matchingDiseases.map((disease, index) => (
                            <div key={index} className={`${styles.diseaseCard} ${styles[disease.risk.toLowerCase()]}`}>
                                <h4>{disease.name}</h4>
                                <p>⚠ <strong>Risk Level:</strong> {disease.risk}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <h3>🔥 Symptom Heatmap</h3>
            <div className={styles.heatmap}>
                {Object.entries(symptomFrequency).map(([symptom, frequency]) => (
                    <div key={symptom} className={styles.heatmapItem} style={{ backgroundColor: `rgba(255, 69, 0, ${frequency / 100})` }}>
                        {symptom} ({frequency}%)
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchSymptoms;
