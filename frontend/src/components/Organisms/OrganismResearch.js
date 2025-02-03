import React, { useState } from "react";
import styles from "./OrganismResearch.module.css";

const researchArticles = [
    {
        title: "Genomic Variations in Mammals",
        author: "Dr. Emily Carter",
        year: 2023,
        summary: "This study explores genetic variations among mammals and their evolutionary significance.",
    },
    {
        title: "CRISPR in Model Organisms",
        author: "Prof. John Doe",
        year: 2022,
        summary: "A detailed analysis of how CRISPR is revolutionizing genetic research in model organisms.",
    },
    {
        title: "Evolutionary Insights from Microbial Genomes",
        author: "Dr. Lisa Wong",
        year: 2021,
        summary: "A deep dive into microbial genomics and its impact on understanding evolution.",
    },
    {
        title: "Plant Genomics and Adaptive Evolution",
        author: "Dr. Mark Spencer",
        year: 2023,
        summary: "Investigates how plant genomes adapt to environmental stress and climate change.",
    },
];

const OrganismResearch = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedArticle, setSelectedArticle] = useState(null);

    const filteredArticles = researchArticles.filter((article) =>
        article.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.container}>
            <h2 className={styles.heading}>Explore Research on Organisms</h2>

            {/* Search Bar */}
            <input
                type="text"
                className={styles.searchBar}
                placeholder="Search for research articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className={styles.grid}>
                {filteredArticles.map((article, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => setSelectedArticle(article)}
                    >
                        <h3>{article.title}</h3>
                        <p><strong>Author:</strong> {article.author}</p>
                        <p><strong>Year:</strong> {article.year}</p>
                    </div>
                ))}
            </div>

            {/* Modal for Article Details */}
            {selectedArticle && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>{selectedArticle.title}</h3>
                        <p><strong>Author:</strong> {selectedArticle.author}</p>
                        <p><strong>Year:</strong> {selectedArticle.year}</p>
                        <p><strong>Summary:</strong> {selectedArticle.summary}</p>
                        <button className={styles.closeButton} onClick={() => setSelectedArticle(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganismResearch;
