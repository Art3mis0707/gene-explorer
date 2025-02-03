import React, { useState } from "react";
import styles from "./OrganismResearch.module.css";

const researchArticles = [
    {
        title: "Genomic Variations in Mammals",
        author: "Dr. Emily Carter",
        year: 2023,
        abstract: "This study explores the various genomic variations found across mammal species and their evolutionary implications.",
        fullContent: "This detailed research paper covers extensive genomic variations across multiple mammal species, including humans, elephants, and whales. The study also highlights how these variations contribute to disease resistance, longevity, and adaptability in different environments."
    },
    {
        title: "CRISPR in Model Organisms",
        author: "Prof. John Doe",
        year: 2022,
        abstract: "A comprehensive analysis of CRISPR technology and its application in genetic studies using model organisms.",
        fullContent: "CRISPR-Cas9 has revolutionized genetic studies, particularly in model organisms such as mice and zebrafish. This paper delves into the applications of CRISPR in gene editing, highlighting breakthroughs in medicine, agriculture, and biotechnology."
    },
    {
        title: "Evolutionary Insights from Microbial Genomes",
        author: "Dr. Lisa Wong",
        year: 2021,
        abstract: "Understanding the evolution of microbial genomes and their role in human health and disease.",
        fullContent: "The evolutionary history of microbial genomes offers critical insights into microbial diversity and pathogenicity. This paper focuses on how these microorganisms evolve over time and their influence on human health, including antibiotic resistance and novel disease-causing mechanisms."
    },
    {
        title: "Exploring the Microbiome of Plants",
        author: "Dr. Michael Roberts",
        year: 2023,
        abstract: "A look into how plants and their associated microbes work together to shape their health and growth.",
        fullContent: "This research highlights the importance of plant microbiomes, focusing on how symbiotic bacteria and fungi influence plant growth, nutrient uptake, and disease resistance. The study also explores how these interactions are essential for sustainable agricultural practices."
    },
    {
        title: "Genomic Sequencing of Non-Human Primates",
        author: "Prof. Sarah Green",
        year: 2020,
        abstract: "The role of non-human primates in understanding human genetics and evolution.",
        fullContent: "This paper discusses the comparative genomics of non-human primates like chimpanzees, gorillas, and orangutans. It emphasizes how studying their genomes helps us understand human evolutionary history and genetic diseases."
    },
    {
        title: "Genetic Diversity in Marine Organisms",
        author: "Dr. James Taylor",
        year: 2021,
        abstract: "The role of genetic diversity in marine organisms' adaptability to climate change.",
        fullContent: "This study examines the genetic diversity of marine species, including coral reefs, fish, and invertebrates. It discusses how biodiversity in marine ecosystems plays a critical role in resilience to environmental changes such as ocean acidification and warming."
    },
    {
        title: "Advancements in Plant Gene Editing",
        author: "Dr. Alice Newton",
        year: 2022,
        abstract: "Exploring the use of CRISPR and other gene editing tools in improving crop traits.",
        fullContent: "Gene editing tools, like CRISPR, are revolutionizing the field of agriculture. This paper focuses on how gene editing is being used to enhance crop resistance to pests, improve yield, and even increase nutritional value of staple foods."
    },
    {
        title: "Synthetic Biology and Genetic Engineering",
        author: "Prof. Henry Williams",
        year: 2022,
        abstract: "The future of synthetic biology in developing genetically engineered organisms for various applications.",
        fullContent: "Synthetic biology combines engineering principles with biological sciences to create genetically modified organisms. This research discusses how synthetic biology is used in fields like drug production, biofuels, and environmental remediation."
    },
    {
        title: "Gene Therapy in Human Diseases",
        author: "Dr. Natalie Thompson",
        year: 2024,
        abstract: "Exploring the latest advances in gene therapy for treating genetic disorders.",
        fullContent: "This paper reviews the breakthroughs in gene therapy, particularly in the treatment of rare genetic disorders. By focusing on diseases like cystic fibrosis and muscular dystrophy, the study provides insights into how gene editing could offer permanent cures for genetic conditions."
    }
];

const OrganismResearch = () => {
    const [expandedArticle, setExpandedArticle] = useState(null);

    const toggleArticle = (index) => {
        setExpandedArticle(expandedArticle === index ? null : index);
    };

    return (
        <div className={styles.researchContainer}>
            <h2 className={styles.heading}>Explore Research on Organisms</h2>
            <div className={styles.researchList}>
                {researchArticles.map((article, index) => (
                    <div key={index} className={styles.researchCard}>
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
                                <p>{article.fullContent}</p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default OrganismResearch;
