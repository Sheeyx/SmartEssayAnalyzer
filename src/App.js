import React, { useState, useEffect } from 'react';
import './App.css';
import loadingGif from './assets/loader.gif';
import gmail from './assets/gmail.svg';
import github from './assets/github.svg';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleSendClick = () => {
    setAnalysisResult(null);
    handleSend();
  };

  const handleSend = async () => {
    try {
      setIsLoading(true);

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
      console.log(result);
    } catch (error) {
      console.error('Error fetching data:', error.message);
    } finally {
      setIsLoading(false);
    }
  };


  const formattedText = analysisResult ? (
    analysisResult.split('\n').map((paragraph, index) => {
      const words = paragraph.split(/\s+/);
      const isBold = words.length <= 30;

      return (
        <p key={index}>
          {isBold ? <strong>{paragraph}</strong> : paragraph}
        </p>
      );
    })
  ) : null;

  return (
    <div className="container">
      <div className="header">
      <div className="social-icons" style={{display: "flex", alignItems: "center", justifyContent: "space-between", marginRight: "100px"}}>

        <h1>EssayAnalyzer</h1>
        <div style={{display:"flex", alignContent:"center", marign:"0px"}}>
        <a href="mailto:mirsaidd04@gmail.com" target="_blank" rel="noopener noreferrer">              <img style={{height: "40px", width:"40px"}} src={gmail}></img>
            </a>
            <a href="https://github.com/Mirsaid04" target="_blank" rel="noopener noreferrer">
              <img style={{height: "40px", width:"40px", marginLeft:"20px"}} src={github}></img>
          </a>
        </div>
          
        </div>
      </div>

      <div className="body">
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

        <div className="column">
          <div className="result">
            <h2 style={{ fontSize: "28px" }}>Essay Feedback:</h2>
            <p>
              Based on the IELTS Writing marking criteria, which comprises Task Response,
              Coherence and Cohesion, Lexical Resource, and Grammatical Range and Accuracy.
            </p>

            {analysisResult !== null ? (
              formattedText
            ) : (
              <div>
                {isLoading ? (
                  <div style={{ height: "40vh", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <img style={{ width: "100px", height: "100px" }} src={loadingGif} alt="Loading..." />
                  </div>
                ) : (
                  <p>Enter your essay and click "Send" to analyze.</p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
