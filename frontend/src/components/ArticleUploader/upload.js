// ArticleUploader.js
import React, { useState } from "react";
import styles from "./upload.module.css";

const ArticleUploader = () => {
  const [title, setTitle] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [link, setLink] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleUpload = async () => {
    if (!title || !excerpt || !link) {
      setError("Please fill in all fields");
      return;
    }

    const article = { title, excerpt, link };

    try {
      const res = await fetch("http://localhost:5001/api/articles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(article)
      });
      if (!res.ok) {
        throw new Error("Failed to upload article");
      }
      const data = await res.json();
      setSuccess(`Article "${data.title}" uploaded successfully!`);
      // Reset form fields
      setTitle("");
      setExcerpt("");
      setLink("");
    } catch (err) {
      setError(err.message);
      console.error("Error uploading article:", err);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.modalTitle}>Upload Research Article</h2>
      {error && <p className={styles.errorMessage}>{error}</p>}
      {success && <p className={styles.successMessage}>{success}</p>}
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.inputField}
      />
      <textarea
        placeholder="Excerpt"
        value={excerpt}
        onChange={(e) => setExcerpt(e.target.value)}
        className={styles.textAreaField}
      />
      <input
        type="text"
        placeholder="Link"
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className={styles.inputField}
      />
      <button className={styles.uploadConfirm} onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
};

export default ArticleUploader;
