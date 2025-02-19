// ArticleList.js (updated version)
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./ArticleList.module.css";

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If your React app is served on a different port, ensure your package.json
    // has "proxy": "http://localhost:5001" or use the absolute URL.
    fetch("http://localhost:5001/api/articles")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setArticles(data);
      })
      .catch((err) => {
        setError(err.message);
        console.error("Error fetching articles:", err);
      });
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={styles.listContainer}>
      <Link to="/" className={styles.backButton}>
        Back to Home
      </Link>
      <h2 className={styles.title}>Research Articles</h2>
      <p className={styles.subtitle}>Explore the latest advancements in bioinformatics and genetics.</p>

      <div className={styles.articleList}>
        {articles.map((article) => (
          <div key={article._id} className={styles.articleCard}>
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

    </div>
  );
};

export default ArticleList;
