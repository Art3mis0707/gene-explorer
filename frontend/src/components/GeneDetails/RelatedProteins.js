import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./RelatedProteins.module.css";
import { FaDna, FaInfoCircle, FaChevronDown, FaChevronUp } from "react-icons/fa";

const RelatedProteins = () => {
  const [proteinData, setProteinData] = useState([]);
  const [expandedRow, setExpandedRow] = useState(null);

  useEffect(() => {
    // Use the absolute URL or configure a proxy in package.json for a relative URL.
    fetch("http://localhost:5001/api/proteins/related-proteins")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        return res.json();
      })
      .then((data) => {
        setProteinData(data);
      })
      .catch((error) => console.error("Error fetching proteins:", error));
  }, []);

  const toggleDetails = (index) => {
    setExpandedRow(expandedRow === index ? null : index);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>
          <FaDna /> Related Proteins
        </h1>
        <Link to="/" className={styles.backButton}>
          Back to Home Page
        </Link>
      </header>
      <main className={styles.main}>
        <p className={styles.description}>
          Explore proteins associated with this gene, their biological significance, and structural details.
        </p>
        <table className={styles.proteinTable}>
          <thead>
            <tr>
              <th>Protein</th>
              <th>Related Gene</th>
              <th>Function</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            {proteinData.map((protein, index) => (
              <React.Fragment key={protein.id}>
                {/* Main Row */}
                <tr>
                  <td>{protein.name}</td>
                  <td>{protein.related_gene}</td>
                  <td>{protein.function}</td>
                  <td>
                    <button
                      onClick={() => toggleDetails(index)}
                      className={styles.detailsButton}
                    >
                      {expandedRow === index ? (
                        <>
                          Hide Details <FaChevronUp />
                        </>
                      ) : (
                        <>
                          View Details <FaChevronDown />
                        </>
                      )}
                    </button>
                  </td>
                </tr>
                {/* Expanded Row for Details */}
                {expandedRow === index && (
                  <tr className={styles.expandedRow}>
                    <td colSpan="4">
                      <div className={styles.detailsContent}>
                        <p>
                          <FaInfoCircle /> {protein.details}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))}
          </tbody>
        </table>
      </main>
    </div>
  );
};

export default RelatedProteins;
