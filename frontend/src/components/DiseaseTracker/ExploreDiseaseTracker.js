import React, { useState } from "react";
import styles from "./ExploreDiseaseTracker.module.css";

const diseasesData = [
    { name: "Diabetes", category: "Chronic", symptoms: ["Increased thirst", "Frequent urination"], cause: "Insulin resistance", prevention: "Healthy diet, exercise" },
    { name: "Influenza", category: "Infectious", symptoms: ["Fever", "Cough", "Fatigue"], cause: "Influenza virus", prevention: "Vaccination, hygiene" },
    { name: "Asthma", category: "Respiratory", symptoms: ["Shortness of breath", "Wheezing"], cause: "Airway inflammation", prevention: "Avoid allergens, medication" },
];

const ExploreDiseaseTracker = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("All");

    const filteredDiseases = diseasesData.filter(disease =>
        (filter === "All" || disease.category === filter) &&
        disease.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className={styles.container}>
            <h2>Explore Diseases</h2>
            <input
                type="text"
                placeholder="Search disease..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className={styles.searchBox}
            />
            <select onChange={(e) => setFilter(e.target.value)} className={styles.filterDropdown}>
                <option value="All">All</option>
                <option value="Chronic">Chronic</option>
                <option value="Infectious">Infectious</option>
                <option value="Respiratory">Respiratory</option>
            </select>
            <div className={styles.diseaseList}>
                {filteredDiseases.length > 0 ? filteredDiseases.map((disease, index) => (
                    <div key={index} className={styles.diseaseCard}>
                        <h3>{disease.name}</h3>
                        <p><strong>Category:</strong> {disease.category}</p>
                        <p><strong>Symptoms:</strong> {disease.symptoms.join(", ")}</p>
                        <p><strong>Cause:</strong> {disease.cause}</p>
                        <p><strong>Prevention:</strong> {disease.prevention}</p>
                    </div>
                )) : <p className={styles.noResults}>No results found.</p>}
            </div>
        </div>
    );
};

export default ExploreDiseaseTracker;
