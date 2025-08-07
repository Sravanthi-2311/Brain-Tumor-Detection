import cv2
import numpy as np
import tensorflow as tf
from tensorflow.keras.models import load_model 
import os

# Load model once globally
MODEL_PATH = os.path.join(os.path.dirname(__file__), '..', 'models', 'best_model.h5')
model = load_model(MODEL_PATH)

def preprocess_image(image_path):
    """Load and preprocess the image from disk."""
    img = cv2.imread(image_path)
    if img is None:
        raise ValueError(f"Could not read image from path: {image_path}")

    img = cv2.resize(img, (128, 128))
    img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
    img = img / 255.0
    img = np.expand_dims(img, axis=0)
    return img

def predict_tumor(image_path):
    """Predict tumor presence from image file path."""
    processed_img = preprocess_image(image_path)
    prob = model.predict(processed_img)[0][0]
    label = "Tumor Detected" if prob > 0.5 else "No Tumor"
    return label, float(prob)
