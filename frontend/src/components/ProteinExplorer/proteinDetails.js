import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./proteinDetails.module.css";
import { FaMicroscope, FaSearch } from "react-icons/fa";
import { Radar } from "react-chartjs-2"; 
import {
  Chart,
  PointElement,
  RadialLinearScale,
  LineElement, 
  LinearScale, 
  Title, 
  Tooltip, 
  Legend, 
} from "chart.js";

Chart.register(PointElement, RadialLinearScale, LineElement, LinearScale, Title, Tooltip, Legend);

const ProteinExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [proteinData, setProteinData] = useState([]);
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 

  // Fetch protein data from the new endpoint
  useEffect(() => {
    fetch("http://localhost:5001/api/proteins-det/related-proteins-det")
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

  const filteredProteins = proteinData.filter(
    (protein) =>
      protein.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      protein.function.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const radarData = selectedProtein
    ? {
        labels: ["Stability", "Hydrophobicity", "Activity"],
        datasets: [
          {
            label: selectedProtein.name,
            data: [
              selectedProtein.stability,
              selectedProtein.hydrophobicity,
              selectedProtein.activity,
            ],
            backgroundColor: "rgba(75, 192, 192, 0.2)",
            borderColor: "rgba(75, 192, 192, 1)",
            borderWidth: 2,
          },
        ],
      }
    : null;

  const openModal = (protein) => {
    setSelectedProtein(protein);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProtein(null);
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <h1>
          <FaMicroscope /> Protein Explorer
        </h1>
        <Link to="/" className={styles.backButton}>
          Back to Home Page
        </Link>
      </header>

      <main className={styles.main}>
        <h2>Explore Proteins in Detail</h2>
        <p className={styles.description}>
          Search, analyze, and visualize proteins based on their structures,
          functions, and other properties.
        </p>

        {/* Search Bar */}
        <div className={styles.searchBar}>
          <FaSearch />
          <input
            type="text"
            placeholder="Search proteins by name or function..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Protein List */}
        <div className={styles.proteinList}>
          {filteredProteins.map((protein) => (
            <div
              key={protein.id}
              className={`${styles.proteinCard} ${
                selectedProtein?.name === protein.name ? styles.activeCard : ""
              }`}
              onClick={() => openModal(protein)}
            >
              <h3>{protein.name}</h3>
              <p>{protein.function}</p>
              <div className={styles.category}>{protein.category}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Protein Details Modal */}
      {isModalOpen && selectedProtein && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <button className={styles.closeButton} onClick={closeModal}>
              X
            </button>
            <h3>Details of {selectedProtein.name}</h3>
            <p>{selectedProtein.details}</p>
            {/* Radar Chart */}
            <div className={styles.radarChart}>
              <h4>Protein Properties</h4>
              <Radar data={radarData} options={{ responsive: true }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProteinExplorer;
