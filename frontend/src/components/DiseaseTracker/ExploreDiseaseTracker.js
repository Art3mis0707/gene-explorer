import React, { useState } from "react";
import styles from "./ExploreDiseaseTracker.module.css";

const diseasesData = [
    { name: "Diabetes", category: "Chronic", risk: "Moderate", symptoms: ["Increased thirst", "Frequent urination", "Fatigue"], cause: "Insulin resistance", prevention: "Healthy diet, exercise", treatment: "Insulin therapy, medications" },
    { name: "Influenza", category: "Infectious", risk: "Mild", symptoms: ["Fever", "Cough", "Fatigue"], cause: "Influenza virus", prevention: "Vaccination, hygiene", treatment: "Antiviral medications, rest" },
    { name: "Asthma", category: "Respiratory", risk: "Moderate", symptoms: ["Shortness of breath", "Wheezing"], cause: "Airway inflammation", prevention: "Avoid allergens, medication", treatment: "Inhalers, corticosteroids" },
    { name: "Hypertension", category: "Chronic", risk: "Moderate", symptoms: ["Headache", "Dizziness", "Blurred vision"], cause: "High blood pressure", prevention: "Low-sodium diet, exercise", treatment: "Antihypertensive drugs" },
    { name: "Alzheimer's", category: "Neurological", risk: "Severe", symptoms: ["Memory loss", "Confusion", "Difficulty speaking"], cause: "Brain cell degeneration", prevention: "Healthy diet, mental exercises", treatment: "Cognitive therapy, medications" },
    { name: "COVID-19", category: "Infectious", risk: "Severe", symptoms: ["Fever", "Cough", "Loss of taste/smell"], cause: "SARS-CoV-2 virus", prevention: "Vaccination, masks", treatment: "Oxygen therapy, antivirals" },
    { name: "Tuberculosis", category: "Infectious", risk: "Severe", symptoms: ["Chronic cough", "Night sweats", "Weight loss"], cause: "Mycobacterium tuberculosis", prevention: "BCG vaccine, hygiene", treatment: "Antibiotic therapy" },
    { name: "Migraine", category: "Neurological", risk: "Mild", symptoms: ["Severe headache", "Nausea", "Sensitivity to light"], cause: "Genetics, stress", prevention: "Proper sleep, hydration", treatment: "Pain relievers, lifestyle changes" },
    { name: "Pneumonia", category: "Respiratory", risk: "Severe", symptoms: ["Cough", "Fever", "Chest pain"], cause: "Bacterial/Viral infection", prevention: "Vaccination, hygiene", treatment: "Antibiotics, oxygen therapy" },
];

const ExploreDiseaseTracker = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");
    const [expanded, setExpanded] = useState(null);

    const filteredDiseases = diseasesData.filter(disease =>
        (filter === "All" || disease.category === filter) &&
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className={styles.tracker_container}>
            <h2>Explore Disease Tracker</h2>
            <input
                type="text"
                placeholder="Search diseases..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
            <select onChange={(e) => setFilter(e.target.value)} className={styles.filterDropdown}>
                <option value="All">All</option>
                <option value="Chronic">Chronic</option>
                <option value="Infectious">Infectious</option>
                <option value="Respiratory">Respiratory</option>
                <option value="Neurological">Neurological</option>
            </select>
            <div className={styles.diseaseList}>
                {filteredDiseases.map((disease, index) => (
                    <div key={index} className={`${styles.diseaseCard} ${styles[disease.risk.toLowerCase()]}`} onClick={() => setExpanded(expanded === index ? null : index)}>
                        <h3>{disease.name} {disease.risk === "Mild" ? "🟢" : disease.risk === "Moderate" ? "🟡" : "🔴"}</h3>
                        <p><strong>Category:</strong> {disease.category}</p>
                        {expanded === index && (
                            <div className={styles.expandedContent}>
                                <p><strong>Symptoms:</strong> {disease.symptoms.join(", ")}</p>
                                <p><strong>Cause:</strong> {disease.cause}</p>
                                <p><strong>Prevention:</strong> {disease.prevention}</p>
                                <p><strong>Treatment:</strong> {disease.treatment}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExploreDiseaseTracker;
