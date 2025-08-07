import React, { useState } from 'react';

const UploadBox = ({ setPrediction, setProbability, setSuggestion }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handlePredict = async () => {
    if (!file) {
      alert("Please upload an image first!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ This matches backend format
        setPrediction(data.result);         // 'Tumor' or 'No Tumor'
        setProbability(data.probability);   // 0.92
        setSuggestion(data.suggestion);     // "Stay hydrated 🧃"
      } else {
        alert(data.error || "Prediction failed.");
      }
    } catch (error) {
      alert("Server error: " + error.message);
    }
  };

  return (
    <div className="w-full bg-white p-6 rounded-xl shadow-lg text-center space-y-4">
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:border-0
          file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
      />
      <button
        onClick={handlePredict}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
      >
        Predict
      </button>
    </div>
  );
};

export default UploadBox;
