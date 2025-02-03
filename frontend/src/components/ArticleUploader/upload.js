import React, { useState } from "react";
import styles from "./upload.module.css";

const ArticleUploader = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [error, setError] = useState("");

    // Open & Close Modal
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedFile(null);
        setError("");
    };

    // Handle File Selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            // Validate File Format (PDF Only)
            if (file.type !== "application/pdf") {
                setError("Only PDF files are allowed!");
                setSelectedFile(null);
            } else {
                setSelectedFile(file);
                setError("");
            }
        }
    };

    // Handle Upload Submission
    const handleUpload = () => {
        if (!selectedFile) {
            setError("Please select a PDF file to upload.");
            return;
        }

        // Simulate upload
        console.log("Uploading:", selectedFile.name);
        alert(`File "${selectedFile.name}" uploaded successfully!`);

        // Close Modal after upload
        closeModal();
    };

    return (
        <div className={styles.container}>
            {/* Upload Button */}
            <button className={styles.uploadButton} onClick={openModal}>
                Upload Research Article
            </button>

            {/* Modal Overlay */}
            {isModalOpen && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <h2 className={styles.modalTitle}>Upload Research Article</h2>
                        <p className={styles.modalSubtitle}>Please upload your research article in PDF format.</p>

                        {/* File Input */}
                        <input type="file" accept="application/pdf" onChange={handleFileChange} className={styles.fileInput} />

                        {/* Error Message */}
                        {error && <p className={styles.errorMessage}>{error}</p>}

                        {/* Selected File Info */}
                        {selectedFile && (
                            <p className={styles.selectedFile}>
                                Selected File: <strong>{selectedFile.name}</strong>
                            </p>
                        )}

                        {/* Action Buttons */}
                        <div className={styles.buttonGroup}>
                            <button className={styles.uploadConfirm} onClick={handleUpload}>Upload</button>
                            <button className={styles.closeModal} onClick={closeModal}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ArticleUploader;
