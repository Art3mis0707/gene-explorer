// src/components/DiseaseTracker/SearchSymptoms.js
import React, { useState } from 'react';

const SearchSymptoms = ({ onSearch }) => {
  const [symptoms, setSymptoms] = useState("");

  const handleSearch = () => {
    if (symptoms.trim()) {
      onSearch(symptoms);
    }
  };

  return (
    <div className="symptom-search">
      <input
        type="text"
        placeholder="Enter symptoms"
        value={symptoms}
        onChange={(e) => setSymptoms(e.target.value)}
      />
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchSymptoms;
