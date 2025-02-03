from flask import Flask, request, jsonify
from flask_cors import CORS  # Add this import
import numpy as np
import joblib

# Load the trained model and scaler
classifier = joblib.load('svm_classifier.pkl')
scaler = joblib.load('scaler.pkl')

app = Flask(__name__)
CORS(app)  # Enable CORS

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON input from React
        data = request.json
        features = data.get('features', [])  # Match the frontend format
        
        # Preprocess input
        input_array = np.array(features).reshape(1, -1)
        input_scaled = scaler.transform(input_array)
        
        # Make prediction
        prediction = classifier.predict(input_scaled)[0]
        
        # Contributing factors analysis
        factors = []
        if features[0] > 50:  # age
            factors.append("Age: Older age increases risk")
        if features[1] == 1:  # menopause
            factors.append("Menopause: Post-menopause increases risk")
        if features[2] > 2:  # tumor_size
            factors.append("Tumor Size: Larger tumors increase risk")
        if features[3] > 0:  # inv_nodes
            factors.append("Invasive Nodes: Presence increases risk")
        if features[4] == 1:  # metastasis
            factors.append("Metastasis: Presence significantly increases risk")
        if features[5] == 1:  # history
            factors.append("Family History: Previous history increases risk")

        return jsonify({
            "prediction": int(prediction),
            "contributing_factors": factors
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True)