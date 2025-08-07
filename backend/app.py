from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import numpy as np
from utils.predict import predict_tumor

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Folder to save uploaded images
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part in request'}), 400

    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No file selected'}), 400

    # Save uploaded file
    filepath = os.path.abspath(os.path.join(UPLOAD_FOLDER, file.filename))
    file.save(filepath)

    try:
        # Make prediction using your custom predict_tumor function
        label, prob = predict_tumor(filepath)
    except Exception as e:
        return jsonify({'error': 'Prediction failed', 'details': str(e)}), 500

    # Base suggestion pool (generic health tips)

    # Conditional suggestions
    if label.lower() == "tumor detected":
        advice = "⚠️ Tumor detected. Please consult a neurologist or radiologist immediately."
    elif label.lower() == "no tumor" and 0.4 <= prob <= 0.6:
        advice = "⚠️ Prediction confidence is low. Please consult a radiologist for confirmation."
    else:
        advice = "✅ No tumor detected. Keep maintaining a healthy lifestyle."

    return jsonify({
    'result': label,
    'probability': prob,
    'advice': advice,
})


if __name__ == '__main__':
    app.run(debug=True)
