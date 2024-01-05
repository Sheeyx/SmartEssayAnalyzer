// App.jsx

import React, { useState } from 'react';
import EssayAnalyzer from './EssayAnalyzer';
import './styles.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = () => {
    // Add your logic for analyzing the essay and updating the analysisResult state here
    // For simplicity, let's just echo the input for now
    setAnalysisResult(inputText);
  };

  return (
    <div className="container">
      {/* Header */}
      <div className="header">
        <h1>EssayAnalyzer</h1>
        <img src="/path/to/your/logo.png" alt="Logo" className="logo" />
      </div>

      {/* Body */}
      <div className="body">
        {/* Input */}
        <input
          type="text"
          placeholder="Enter your essay here..."
          value={inputText}
          onChange={handleInputChange}
          className="inputField"
        />

        {/* Send Button */}
        <button onClick={handleSendClick}>Send</button>
        </div>
        {/* Result */}
        <div className="result">
          <h2>Analysis Result:</h2>
          <p>{analysisResult}</p>
        </div>
    </div>
  );
};

export default App;
