import React, { useState, useEffect } from "react";
import styles from "./OrganismResearch.module.css";

const OrganismResearch = () => {
    const [researchArticles, setResearchArticles] = useState([]);
    const [expandedArticle, setExpandedArticle] = useState(null);

    useEffect(() => {
        fetch("http://localhost:5001/api/organism-research")
            .then((res) => {
                if (!res.ok) {
                    throw new Error("Failed to fetch research articles");
                }
                return res.json();
            })
            .then((data) => {
                setResearchArticles(data);
            })
            .catch((error) => console.error("Error fetching research articles:", error));
    }, []);

    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };

    return (
        <div className={styles.researchContainer}>
            <h2 className={styles.heading}>Explore Research on Organisms</h2>
            <div className={styles.researchList}>
                {researchArticles.map((article, index) => (
                    <div key={article.id} className={styles.researchCard}>
                        <h3 className={styles.title}>{article.title}</h3>
                        <p className={styles.author}><strong>Author:</strong> {article.author}</p>
                        <p className={styles.year}><strong>Year:</strong> {article.year}</p>
                        <p className={styles.abstract}>{article.abstract}</p>
                        <button 
                            onClick={() => toggleArticle(index)} 
                            className={styles.readMore}
                        >
                            {expandedArticle === index ? "Show Less" : "Read More"}
                        </button>
                        {expandedArticle === index && (
                            <div className={styles.fullContent}>
                                <p>{article.full_content}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrganismResearch;
