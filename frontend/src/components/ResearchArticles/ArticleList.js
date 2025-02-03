import React from "react";
import styles from "./ArticleList.module.css";

const articles = [
    { id: 1, title: "AI in Bioinformatics", excerpt: "How AI is transforming genetic research and disease detection.", link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC11413381/"},
    { id: 2, title: "RNA Sequencing Advances", excerpt: "The future of RNA sequencing and its role in medicine.", link: "https://www.nature.com/articles/nrg2934" },
    { id: 3, title: "Genetic Mutation Analysis", excerpt: "Understanding genetic mutations and their impact on health.",link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10166913/" },
    { id: 4, title: "Deep Learning for Protein Folding", excerpt: "How AI predicts protein structures with high accuracy.",link: "https://pmc.ncbi.nlm.nih.gov/articles/PMC10912668/" },
];

const ArticlesList = () => {
    return (
        <div className={styles.listContainer}>
            <h2 className={styles.title}>Research Articles</h2>
            <p className={styles.subtitle}>Explore the latest advancements in bioinformatics and genetics.</p>

            <div className={styles.articleList}>
                {articles.map((article) => (
                    <div key={article.id} className={styles.articleCard}>
                        <h3 className={styles.articleTitle}>{article.title}</h3>
                        <p className={styles.articleExcerpt}>{article.excerpt}</p>
                        <a 
                            href={article.link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.readMore}
                        >
                            Read More →
                        </a>
                    </div>
                ))}
            </div>

            <a href="/" className={styles.backButton}>← Back to Home</a>
        </div>
    );
};

export default ArticlesList;
