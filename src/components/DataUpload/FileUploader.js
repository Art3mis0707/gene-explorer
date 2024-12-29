// src/components/DataUpload/FileUploader.js
import React, { useState } from 'react';

const FileUploader = ({ onUpload }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (file) {
      const reader = new FileReader();
      reader.onload = () => onUpload(reader.result);
      reader.readAsText(file);
    }
  };

  return (
    <div className="file-uploader">
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUploader;
