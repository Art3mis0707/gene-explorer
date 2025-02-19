import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./OrganismGenes.module.css";

const OrganismExplorer = () => {
    const [organisms, setOrganisms] = useState([]);
    const [selectedOrganism, setSelectedOrganism] = useState(null);
    const [clickCount, setClickCount] = useState(0);

    // Fetch organisms data from the backend
    useEffect(() => {
        fetch("http://localhost:5001/api/organisms")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch organism data");
                }
                return res.json();
            })
            .then((data) => {
                setOrganisms(data);
            })
            .catch((error) => console.error("Error fetching organisms:", error));
    }, []);

    const openOrganismDetails = (organism) => {
        if (selectedOrganism && selectedOrganism.name === organism.name) {
            setClickCount((prev) => prev + 1);
        } else {
            setSelectedOrganism(organism);
            setClickCount(1);
        }
    };

    const getNewContent = (organism) => {
        if (clickCount === 0) {
            return organism.initial_description;
        } else {
            // Cycle through details; details is stored as JSON so it should be parsed as an array
            return organism.details[clickCount % organism.details.length] || organism.initial_description;
        }
    };

    return (
        <div className={styles.organism_container}>
            <Link to="/" className={styles.backButton}>
                Back to Home
            </Link>
            <h2 className={styles.heading}>Explore Organism Genes</h2>
            <div className={styles.grid}>
                {organisms.map((organism, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => openOrganismDetails(organism)}
                    >
                        <h3>{organism.name}</h3>
                        <p><strong>Genes:</strong> {organism.genes}</p>
                        <p><strong>Key Genes:</strong> {organism.key_genes.join(", ")}</p>
                        <p><strong>Description:</strong> {organism.initial_description}</p>
                    </div>
                ))}
            </div>

            {selectedOrganism && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>{selectedOrganism.name} - Gene Details</h3>
                        <p><strong>Number of Genes:</strong> {selectedOrganism.genes}</p>
                        <p><strong>Key Genes:</strong> {selectedOrganism.key_genes.join(", ")}</p>
                        <p><strong>Details:</strong> {getNewContent(selectedOrganism)}</p>
                        <button className={styles.closeButton} onClick={() => setSelectedOrganism(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganismExplorer;
