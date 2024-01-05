import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const addNewLineBeforeDoubleAsterisk = (text) => {
    return text.split('\n').map((line, index) => {
      if (line.includes('**')) {
        return (
          <React.Fragment key={index}>
            <br />
            {line}
          </React.Fragment>
        );
      }
      return line;
    });
  };

  const handleSendClick = async () => {
    try {
      const response = await fetch('https://smartessaychecker.azurewebsites.net/api/Home', {
        method: 'POST',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: inputText,
      });

      if (!response.ok) {
        throw new Error('Failed to fetch data from the API');
      }

      const result = await response.text();
      setAnalysisResult(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    }
  };

  return (
    <div className="container">
      {/* Header */}
      {console.log(analysisResult, 'analysisResult')}
      <div className="header">
        <h1>EssayAnalyzer</h1>
        {/* Your logo goes here */}
      </div>

      {/* Body */}
      <div className="body">
        {/* Input and Button Column */}
        <div className="column">
          <textarea
            type="text"
            placeholder="Enter your essay here..."
            value={inputText}
            onChange={handleInputChange}
            className="inputField"
          />
          <button onClick={handleSendClick}>Send</button>
        </div>

        {/* Result Column */}
        <div className="column">
          <div className="result">
            <h2>Analysis Result:</h2>
            {/* Directly use the logic to display the modified text */}
            <div>{addNewLineBeforeDoubleAsterisk(analysisResult)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
