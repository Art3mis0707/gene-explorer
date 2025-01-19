import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./proteinDetails.module.css";
import { FaMicroscope, FaSearch } from "react-icons/fa";
import { Radar } from "react-chartjs-2"; // For radar chart (install `chart.js` and `react-chartjs-2`)
import {
  Chart,
  PointElement,
  RadialLinearScale,
  LineElement, // For line charts
  LinearScale, // For scale handling
  Title, // For chart title
  Tooltip, // For tooltips
  Legend, // For the legend
} from "chart.js";

// Register the point element and other necessary components
Chart.register(PointElement, RadialLinearScale, LineElement, LinearScale, Title, Tooltip, Legend);

const proteinData = [
  {
    name: "Insulin",
    function: "Regulates blood glucose levels.",
    category: "Hormones",
    stability: 85,
    hydrophobicity: 70,
    activity: 90,
    structureType: "Globular",
    details:
      "Insulin is a peptide hormone that regulates blood sugar by facilitating the uptake of glucose into cells.",
  },
  {
    name: "Hemoglobin",
    function: "Transports oxygen in the blood.",
    category: "Transport Proteins",
    stability: 90,
    hydrophobicity: 60,
    activity: 85,
    structureType: "Tetramer",
    details:
      "Hemoglobin is an iron-containing protein that binds oxygen in red blood cells for efficient transport throughout the body.",
  },
  {
    name: "Lactase",
    function: "Breaks down lactose in the digestive system.",
    category: "Enzymes",
    stability: 75,
    hydrophobicity: 50,
    activity: 80,
    structureType: "Helical",
    details:
      "Lactase is an enzyme responsible for breaking down lactose into glucose and galactose in the small intestine.",
  },
  {
    name: "VEGF-A",
    function: "Stimulates blood vessel formation.",
    category: "Growth Factors",
    stability: 80,
    hydrophobicity: 65,
    activity: 88,
    structureType: "Dimer",
    details:
      "VEGF-A is a signaling protein involved in angiogenesis, promoting the growth of new blood vessels.",
  },
  {
    name: "Myosin",
    function: "Facilitates muscle contraction.",
    category: "Motor Proteins",
    stability: 92,
    hydrophobicity: 55,
    activity: 87,
    structureType: "Filamentous",
    details:
      "Myosin is a motor protein responsible for converting chemical energy into mechanical work, facilitating muscle contraction.",
  },
  {
    name: "Albumin",
    function: "Maintains osmotic pressure in the blood.",
    category: "Transport Proteins",
    stability: 88,
    hydrophobicity: 62,
    activity: 84,
    structureType: "Globular",
    details:
      "Albumin is a plasma protein responsible for maintaining osmotic pressure and transporting various substances in the blood.",
  },
  {
    name: "Keratin",
    function: "Provides structural strength to hair and nails.",
    category: "Structural Proteins",
    stability: 95,
    hydrophobicity: 40,
    activity: 78,
    structureType: "Fibrous",
    details:
      "Keratin is a fibrous protein that forms the structural framework of hair, nails, and the outer layer of skin.",
  },
  {
    name: "Actin",
    function: "Forms the cytoskeleton and supports cell movement.",
    category: "Structural Proteins",
    stability: 89,
    hydrophobicity: 58,
    activity: 86,
    structureType: "Filamentous",
    details:
      "Actin is a protein that forms microfilaments, playing a key role in cell shape, intracellular transport, and motility.",
  },
  {
    name: "Caspase-3",
    function: "Mediates apoptosis (programmed cell death).",
    category: "Enzymes",
    stability: 77,
    hydrophobicity: 48,
    activity: 83,
    structureType: "Tetramer",
    details:
      "Caspase-3 is a cysteine protease enzyme that plays a critical role in apoptosis, ensuring controlled cell death.",
  },
  {
    name: "Collagen",
    function: "Provides tensile strength to connective tissues.",
    category: "Structural Proteins",
    stability: 98,
    hydrophobicity: 35,
    activity: 70,
    structureType: "Triple Helix",
    details:
      "Collagen is a structural protein that forms the extracellular matrix of connective tissues such as skin, tendons, and bones.",
  },
];

const ProteinExplorer = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedProtein, setSelectedProtein] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state

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

  // Open modal
  const openModal = (protein) => {
    setSelectedProtein(protein);
    setIsModalOpen(true);
  };

  // Close modal
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
          {filteredProteins.map((protein, index) => (
            <div
              key={index}
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

        {/* Protein Details Section */}
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
