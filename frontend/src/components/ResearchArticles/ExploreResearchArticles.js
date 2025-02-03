import React from "react";
import { Link } from "react-router-dom";
import styles from "./ExploreResearchArticles.module.css";
import ArticleUploader from "../ArticleUploader/upload";

const ResearchArticles = () => {
    return (
        <div className={styles.researchContainer}>
            {/* Page Title */}
            <h2 className={styles.title}>Explore Research Articles</h2>
            <p className={styles.subtitle}>
                Discover the latest advancements in bioinformatics, genetics, and proteomics. Stay updated with cutting-edge research shaping the future of medicine and biotechnology.
            </p>

            {/* 🔹 Latest Articles Section */}
            <section className={styles.latestArticles}>
                <h3 className={styles.sectionTitle}>Latest Research Articles</h3>
                <div className={styles.articleGrid}>
                    <div className={styles.articleCard}>
                        <h3>🔬 CRISPR and Gene Editing</h3>
                        <p>Explore how CRISPR technology is revolutionizing gene therapy, disease treatments, and its potential in eradicating genetic disorders.</p>
                    </div>
                    <div className={styles.articleCard}>
                        <h3>🧬 Protein Structure Prediction</h3>
                        <p>Understanding the latest AI-driven techniques, such as AlphaFold, in accurately predicting protein structures and their implications in drug discovery.</p>
                    </div>
                    <div className={styles.articleCard}>
                        <h3>🏥 Genomics in Medicine</h3>
                        <p>The role of genomics in precision medicine, tailoring treatments based on genetic makeup, and future healthcare innovations.</p>
                    </div>
                </div>
            </section>

            {/* 🔹 Featured Research Highlights */}
            <section className={styles.featuredResearch}>
                <h3 className={styles.sectionTitle}>🌟 Featured Research Highlights</h3>
                <div className={styles.featuredGrid}>
                    <div className={styles.featuredCard}>
                        <h3>🦠 AI in Disease Diagnosis</h3>
                        <p>How machine learning models are being trained to detect diseases like cancer, Alzheimer's, and rare genetic disorders through genomic data.</p>
                    </div>
                    <div className={styles.featuredCard}>
                        <h3>💊 Drug Discovery Using AI</h3>
                        <p>How AI-driven simulations are accelerating the discovery of new drugs by analyzing molecular interactions.</p>
                    </div>
                </div>
            </section>

            {/* 🔹 Research Categories (Updated with 6 Categories) */}
            <section className={styles.researchCategories}>
                <h3 className={styles.sectionTitle}>🔍 Research Categories</h3>
                <div className={styles.categoryGrid}>
                    <div className={styles.categoryCard}>
                        <h4>🧫 Biotechnology</h4>
                        <p>Innovative advancements in gene therapy, stem cell research, and biopharmaceuticals.</p>
                    </div>
                    <div className={styles.categoryCard}>
                        <h4>🧪 Molecular Biology</h4>
                        <p>Breakthroughs in DNA sequencing, RNA technologies, and molecular diagnostics.</p>
                    </div>
                    <div className={styles.categoryCard}>
                        <h4>🔬 Artificial Intelligence in Research</h4>
                        <p>Leveraging AI and machine learning for predictive modeling in biological sciences.</p>
                    </div>
                    <div className={styles.categoryCard}>
                        <h4>🩺 Medical Innovations</h4>
                        <p>New research on medical devices, bioinformatics applications, and health informatics.</p>
                    </div>
                    <div className={styles.categoryCard}>
                        <h4>🌾 Agricultural Biotechnology</h4>
                        <p>Exploring genetic engineering, crop improvement, and sustainable agriculture innovations.</p>
                    </div>
                    <div className={styles.categoryCard}>
                        <h4>🧠 Neuroscience & AI</h4>
                        <p>The intersection of artificial intelligence and brain research, including neural networks and brain-computer interfaces.</p>
                    </div>
                </div>
            </section>

            {/* 🔹 Article Uploader */}
            <section className={styles.uploadSection}>
                <h3 className={styles.sectionTitle}>📤 Contribute Your Research</h3>
                <p>Are you a researcher? Upload your latest research article and contribute to the global scientific community.</p>
                <ArticleUploader />
            </section>
        </div>
    );
};

export default ResearchArticles;
