import { useState } from 'react';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState('');
  const [probability, setProbability] = useState('');
  const [advice, setAdvice] = useState('');

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);
    setResult('');
    setProbability('');
    setAdvice('');
  };

  const handleUpload = async () => {
    if (!file) return alert('Please upload an image.');

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        body: formData
      });

      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
        setProbability((data.probability * 100).toFixed(2) + '%');
        setAdvice(data.advice);
      } else {
        alert(data.error || 'Something went wrong!');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to connect to server.');
    }
  };

  return (
    <div className="page">
      <div className="container">
        {/* Header Section */}
        <div className="header-box">
          <div className="title-container">
            <img src="/brain_logo.jpg" alt="Brain Icon" className="icon-left" />
            <div>
              <h1>Brain Tumor Detection</h1>
              <p>Upload an MRI scan to detect the presence of a brain tumor</p>
            </div>
          </div>
        </div>

        {/* Upload Section */}
        <div className="upload-box">
          <input type="file" onChange={handleFileChange} />
          <button onClick={handleUpload}>Predict</button>
        </div>

        {/* Preview Image */}
        {file && (
          <div className="preview-box">
            <img src={URL.createObjectURL(file)} alt="Preview" className="image-preview" />
          </div>
        )}

        {/* Result + Confidence Meter */}
        {result && (
          <div className="result-box">
            <h2>Result: {result}</h2>
            <p>Tumor Probability: <strong>{probability}</strong></p>

            {/* Confidence Progress Bar */}
            <div className="progress-wrapper">
              <div className="progress-bar" style={{ width: probability }}></div>
            </div>

            {advice && (
            <p className="suggestion">
              <strong>Advice:</strong> {advice}
            </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
