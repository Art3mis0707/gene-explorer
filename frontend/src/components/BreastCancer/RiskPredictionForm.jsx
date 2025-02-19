import React, { useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './RiskPredictionForm.css';

const RiskPredictionForm = () => {
  const [formData, setFormData] = useState({
    age: '',
    menopause: '',
    tumorSize: '',
    invNodes: '',
    metastasis: '',
    history: '',
    breast: '',
    breastQuadrant: '',
  });
  const [prediction, setPrediction] = useState('');
  const [contributingFactors, setContributingFactors] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // These helper functions are no longer needed if the backend sends contributing factors.
  // You may remove them if desired.
  const analyzeContributingFactors = (inputs) => {
    const factors = [];
    const thresholds = [
      {
        name: "Age",
        value: inputs[0],
        threshold: 50,
        explanation: "Older age increases risk"
      },
      {
        name: "Menopause",
        value: inputs[1],
        threshold: 0,
        explanation: "Menopause status may increase risk"
      },
      {
        name: "Tumor Size",
        value: inputs[2],
        threshold: 20,
        explanation: "Larger tumor size increases risk"
      },
      {
        name: "Inv-Nodes",
        value: inputs[3],
        threshold: 0,
        explanation: "Higher lymph node involvement increases risk"
      },
      {
        name: "Metastasis",
        value: inputs[4],
        threshold: 0,
        explanation: "Metastasis presence increases risk"
      },
      {
        name: "History",
        value: inputs[5],
        threshold: 0,
        explanation: "History of cancer increases risk"
      },
      {
        name: "Breast Location",
        value: inputs[6],
        threshold: -1,
        explanation: inputs[6] === 0 ? "Left breast affected" : "Right breast affected"
      },
      {
        name: "Breast Quadrant",
        value: inputs[7],
        threshold: -1,
        explanation: getQuadrantExplanation(inputs[7])
      }
    ];

    thresholds.forEach(factor => {
      if (factor.threshold === -1 || factor.value > factor.threshold) {
        factors.push({
          name: factor.name,
          value: factor.value,
          explanation: factor.explanation
        });
      }
    });

    return factors;
  };

  const getQuadrantExplanation = (quadrant) => {
    const quadrants = {
      0: "Central location",
      1: "Upper Left quadrant",
      2: "Lower Left quadrant",
      3: "Upper Right quadrant",
      4: "Lower Right quadrant"
    };
    return quadrants[quadrant] || "Unknown quadrant";
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setPrediction('');
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

      if (features.some(isNaN)) {
        throw new Error('Please fill all fields with valid numbers');
      }

      const response = await axios.post('http://127.0.0.1:5000/predict', {
        features: features
      });

      if (response.data && response.data.prediction !== undefined) {
        const predictionResult = response.data.prediction === 1 ? 'High Risk' : 'Low Risk';
        setPrediction(predictionResult);
        // Use contributing factors returned by the backend
        setContributingFactors(response.data.contributing_factors);
      } else {
        throw new Error('Invalid response from server');
      }
    } catch (err) {
      console.error('Prediction error:', err);
      setError('Error while making the prediction. Please check the inputs or try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-container">
      <Link to="/" className="backButton">
        Back to Home
      </Link>
      <h2>Breast Cancer Risk Prediction</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            min="0"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label>Menopause:</label>
          <select
            name="menopause"
            value={formData.menopause}
            onChange={handleChange}
            required
          >
            <option value="">Select option</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Tumor Size (in mm):</label>
          <input
            type="number"
            name="tumorSize"
            value={formData.tumorSize}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Inv-Nodes:</label>
          <input
            type="number"
            name="invNodes"
            value={formData.invNodes}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className="form-group">
          <label>Metastasis:</label>
          <select
            name="metastasis"
            value={formData.metastasis}
            onChange={handleChange}
            required
          >
            <option value="">Select option</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>History:</label>
          <select
            name="history"
            value={formData.history}
            onChange={handleChange}
            required
          >
            <option value="">Select option</option>
            <option value="0">No</option>
            <option value="1">Yes</option>
          </select>
        </div>

        <div className="form-group">
          <label>Breast:</label>
          <select
            name="breast"
            value={formData.breast}
            onChange={handleChange}
            required
          >
            <option value="">Select option</option>
            <option value="0">Left</option>
            <option value="1">Right</option>
          </select>
        </div>

        <div className="form-group">
          <label>Breast Quadrant:</label>
          <select
            name="breastQuadrant"
            value={formData.breastQuadrant}
            onChange={handleChange}
            required
          >
            <option value="">Select option</option>
            <option value="0">Central</option>
            <option value="1">Upper Left</option>
            <option value="2">Lower Left</option>
            <option value="3">Upper Right</option>
            <option value="4">Lower Right</option>
          </select>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Processing...' : 'Predict Risk'}
        </button>
      </form>

      {prediction && (
        <div className={`prediction-results ${prediction === 'High Risk' ? 'high-risk' : 'low-risk'}`}>
          <h3>Prediction: {prediction}</h3>
          
          <div className="contributing-factors">
            <h4>Contributing Factors:</h4>
            {contributingFactors.length > 0 ? (
              <ul>
                {contributingFactors.map((factor, index) => (
                  <li key={index}>
                    <strong>{factor}</strong>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No significant risk factors detected.</p>
            )}
          </div>
        </div>
      )}
      
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default RiskPredictionForm;
