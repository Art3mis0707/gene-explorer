import React, { useState } from "react";
import styles from "./OrganismGenes.module.css";

// List of organisms with detailed information
const organismGenes = [
    {
        name: "Homo sapiens", 
        genes: "20,000+", 
        keyGenes: ["BRCA1", "TP53", "FOXP2"],
        initialDescription: "Humans have a complex set of genes that regulate various biological processes.",
        details: [
            "The human genome is extensively studied for genetic disorders and disease susceptibility.",
            "Recent advancements in CRISPR technology have focused on humans for gene editing in clinical trials.",
            "Humans possess a unique set of genes that govern complex traits such as intelligence and behavior.",
            "Studies have shown that over 2,000 genetic diseases are linked to specific gene mutations in humans.",
            "Human genetic studies have led to significant advancements in personalized medicine and cancer therapies."
        ]
    },
    {
        name: "Mus musculus", 
        genes: "23,000+", 
        keyGenes: ["GATA4", "PAX6", "HBB"],
        initialDescription: "Mice serve as model organisms for understanding human diseases and genetic pathways.",
        details: [
            "Mice are used for studying cancer and immunology due to their genetic similarity to humans.",
            "Studies of gene knockouts in mice have led to important discoveries in genetic diseases.",
            "Mice are frequently used in testing the safety of new medical drugs.",
            "Advancements in mouse genomics are shedding light on the genetic causes of neurological diseases.",
            "The mouse genome is one of the most well-documented, and its study has advanced biomedical science."
        ]
    },
    {
        name: "Drosophila melanogaster", 
        genes: "14,000+", 
        keyGenes: ["Notch", "Ultrabithorax", "Hedgehog"],
        initialDescription: "Fruit flies are key model organisms for studying genetics, development, and behavior.",
        details: [
            "Drosophila has been instrumental in understanding the genetic mechanisms behind development and inheritance.",
            "The study of Drosophila has been pivotal in identifying genes involved in cancer, neural diseases, and aging.",
            "Many basic genetic concepts such as dominant and recessive traits were first understood through Drosophila experiments.",
            "Research in Drosophila has provided insights into evolutionary biology and the genetic basis of behavior."
        ]
    },
    {
        name: "Saccharomyces cerevisiae", 
        genes: "6,000+", 
        keyGenes: ["ACT1", "HSP104", "GAL4"],
        initialDescription: "Yeast is used in genetic studies and biotechnology due to its simplicity and fast replication.",
        details: [
            "Saccharomyces cerevisiae is a model eukaryote used to study cell cycle, genetics, and aging.",
            "The yeast genome is extensively studied for insights into metabolic pathways and gene regulation.",
            "Yeast is often used in research for producing biofuels, medicines, and other industrial products.",
            "Genetic studies in Saccharomyces have been key in understanding chromosomal stability and gene expression."
        ]
    },
    {
        name: "Arabidopsis thaliana", 
        genes: "25,000+", 
        keyGenes: ["APETALA1", "FLOWERING LOCUS T", "FLC"],
        initialDescription: "Arabidopsis is a model organism in plant biology, used extensively in genetic research.",
        details: [
            "Arabidopsis has been crucial in studying plant development, flowering, and responses to environmental stresses.",
            "The study of Arabidopsis has led to breakthroughs in understanding plant diseases and pest resistance.",
            "Arabidopsis is often used to study plant genome sequencing and gene function in crop improvement.",
            "Recent studies have used Arabidopsis to explore genetic mechanisms related to climate change resilience in plants."
        ]
    },
    {
        name: "Escherichia coli", 
        genes: "4,300+", 
        keyGenes: ["lacZ", "recA", "gyrA"],
        initialDescription: "E. coli is a commonly used bacterium in genetic research and biotechnology.",
        details: [
            "E. coli plays a key role in molecular biology and recombinant DNA technology.",
            "The bacterium is used in protein production and gene cloning.",
            "Its genome has been fully sequenced, making it one of the most studied organisms.",
            "E. coli has been instrumental in the discovery of various genetic and metabolic pathways."
        ]
    },
    {
        name: "C. elegans", 
        genes: "20,000+", 
        keyGenes: ["lin-4", "let-7", "daf-2"],
        initialDescription: "C. elegans is a model nematode for studying development and aging.",
        details: [
            "C. elegans was the first multicellular organism to have its genome sequenced.",
            "It is widely used to study developmental biology, neural circuits, and aging.",
            "The nematode's transparent body allows for in vivo observation of its genetic processes.",
            "Genetic studies in C. elegans have contributed significantly to aging and neurodegenerative disease research."
        ]
    },
    {
        name: "Danio rerio", 
        genes: "25,000+", 
        keyGenes: ["fgf8", "shh", "tbx5"],
        initialDescription: "Zebrafish are used in genetics and developmental biology studies, especially in the study of vertebrate organ development.",
        details: [
            "Zebrafish embryos are transparent, which allows for real-time observation of gene expression during development.",
            "They are commonly used to study heart disease, cancer, and neural development due to their vertebrate nature.",
            "Zebrafish have become a key model organism in drug screening and understanding developmental disorders.",
            "The zebrafish genome has provided insights into the development of the nervous system and organ regeneration.",
            "Zebrafish have been used to model human diseases such as leukemia and muscular dystrophy."
        ]
    }
];

const OrganismExplorer = () => {
    const [selectedOrganism, setSelectedOrganism] = useState(null);
    const [clickCount, setClickCount] = useState(0);  // Track number of clicks on an organism

    // Function to open organism details and change content based on clicks
    const openOrganismDetails = (organism) => {
        if (selectedOrganism && selectedOrganism.name === organism.name) {
            // If the selected organism is the same, increment the click count
            setClickCount(prev => prev + 1);
        } else {
            // Otherwise, reset the click count and select the new organism
            setSelectedOrganism(organism);
            setClickCount(1);  // Reset click count to 1
        }
    };

    // Function to get new detailed content based on the number of clicks
    const getNewContent = (organism) => {
        if (clickCount === 0) {
            return organism.initialDescription;  // Show the initial description first
        } else {
            // Cycle through the organism's details after the first click
            return organism.details[clickCount % organism.details.length] || organism.initialDescription;
        }
    };

    return (
        <div className={styles.organism_container}>
            <h2 className={styles.heading}>Explore Organism Genes</h2>
            <div className={styles.grid}>
                {organismGenes.map((organism, index) => (
                    <div
                        key={index}
                        className={styles.card}
                        onClick={() => openOrganismDetails(organism)}
                    >
                        <h3>{organism.name}</h3>
                        <p><strong>Genes:</strong> {organism.genes}</p>
                        <p><strong>Key Genes:</strong> {organism.keyGenes.join(", ")}</p>
                        <p><strong>Description:</strong> {organism.initialDescription}</p>
                    </div>
                ))}
            </div>

            {selectedOrganism && (
                <div className={styles.modal}>
                    <div className={styles.modalContent}>
                        <h3>{selectedOrganism.name} - Gene Details</h3>
                        <p><strong>Number of Genes:</strong> {selectedOrganism.genes}</p>
                        <p><strong>Key Genes:</strong> {selectedOrganism.keyGenes.join(", ")}</p>
                        <p><strong>Details:</strong> {getNewContent(selectedOrganism)}</p>
                        <button className={styles.closeButton} onClick={() => setSelectedOrganism(null)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrganismExplorer;
