import React, { useState } from 'react';
import axios from 'axios';
import './RiskPredictionForm.css';

const INITIAL_FORM_STATE = {
  age: '',
  menopause: '',
  tumorSize: '',
  invNodes: '',
  metastasis: '',
  history: '',
  breast: '',
  breastQuadrant: '',
};

const FORM_FIELDS = [
  {
    name: 'age',
    label: 'Age',
    type: 'number',
    min: 0,
    max: 120,
  },
  {
    name: 'menopause',
    label: 'Menopause',
    type: 'select',
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ],
  },
  {
    name: 'tumorSize',
    label: 'Tumor Size (cm)',
    type: 'number',
    step: '0.1',
    min: 0,
  },
  {
    name: 'invNodes',
    label: 'Inv-Nodes',
    type: 'number',
    min: 0,
  },
  {
    name: 'metastasis',
    label: 'Metastasis',
    type: 'select',
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ],
  },
  {
    name: 'history',
    label: 'Family History',
    type: 'select',
    options: [
      { value: '0', label: 'No' },
      { value: '1', label: 'Yes' },
    ],
  },
  {
    name: 'breast',
    label: 'Breast',
    type: 'select',
    options: [
      { value: '0', label: 'Left' },
      { value: '1', label: 'Right' },
    ],
  },
  {
    name: 'breastQuadrant',
    label: 'Breast Quadrant',
    type: 'select',
    options: [
      { value: '0', label: 'Central' },
      { value: '1', label: 'Upper Left' },
      { value: '2', label: 'Lower Left' },
      { value: '3', label: 'Upper Right' },
      { value: '4', label: 'Lower Right' },
    ],
  },
];

const RiskPredictionForm = () => {
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);
  const [prediction, setPrediction] = useState(null);
  const [contributingFactors, setContributingFactors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setPrediction(null);
    setContributingFactors([]);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction(null);
    setContributingFactors([]);
    setLoading(true);

    try {
      const features = [
        parseFloat(formData.age),
        parseInt(formData.menopause),
        parseFloat(formData.tumorSize),
        parseFloat(formData.invNodes),
        parseInt(formData.metastasis),
        parseInt(formData.history),
        parseInt(formData.breast),
        parseInt(formData.breastQuadrant),
      ];

      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features,
      });

      setPrediction(response.data.prediction === 1 ? 'High Risk' : 'Low Risk');
      if (response.data.contributing_factors) {
        setContributingFactors(response.data.contributing_factors);
      }
    } catch (err) {
      setError(
        err.response?.data?.error || 
        'Error while making the prediction. Please check the inputs or try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  const renderFormField = (field) => {
    const commonProps = {
      name: field.name,
      value: formData[field.name],
      onChange: handleChange,
      required: true,
      id: field.name,
    };

    if (field.type === 'select') {
      return (
        <select {...commonProps}>
          <option value="">Select {field.label}</option>
          {field.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      );
    }

    return (
      <input
        type={field.type}
        {...commonProps}
        min={field.min}
        max={field.max}
        step={field.step}
      />
    );
  };

  return (
    <div className="form-container">
      <h2>Breast Cancer Risk Prediction</h2>
      
      <form onSubmit={handleSubmit}>
        {FORM_FIELDS.map((field) => (
          <div key={field.name} className="form-group">
            <label htmlFor={field.name}>{field.label}:</label>
            {renderFormField(field)}
          </div>
        ))}

        <div className="button-group">
          <button type="submit" disabled={loading} className="submit-button">
            {loading ? 'Processing...' : 'Predict Risk'}
          </button>
          <button 
            type="button" 
            onClick={resetForm} 
            disabled={loading}
            className="reset-button"
          >
            Reset Form
          </button>
        </div>
      </form>

      {prediction && (
        <div className={`prediction ${prediction === 'High Risk' ? 'high-risk' : 'low-risk'}`}>
          <h3>Prediction: {prediction}</h3>
          {contributingFactors.length > 0 && (
            <div className="contributing-factors">
              <h4>Contributing Factors:</h4>
              <ul>
                {contributingFactors.map((factor, index) => (
                  <li key={index}>{factor}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
      
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RiskPredictionForm;