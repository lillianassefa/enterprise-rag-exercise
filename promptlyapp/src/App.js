import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [userMessage, setUserMessage] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  // const [selectedOption, setSelectedOption] = useState('Option 1');
  const handleGeneratePrompts = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/get_prompt_completion', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user_message: userMessage }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      setGeneratedContent(result.generated_content);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };
  const handleFileUpload = (event) => {
    // Handle file upload logic here
    const file = event.target.files[0];
    console.log('Uploaded file:', file);
  };
  // const handleDropdownChange = (event) => {
  //   setSelectedOption(event.target.value);
  // };
  return (
    <div className="container">
      <header>
        <h1>Promptly</h1>
      </header>

      <main className="main-container">
        {/* Left side: Generate Prompts */}
        <section className="left-section">
          <h2>Generate Prompts</h2>
          <textarea
            placeholder="Enter your prompt..."
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
          />
          <button onClick={handleGeneratePrompts}>Generate</button>
          {generatedContent && (
            <section className="generated-content">
              <h3>Enhanced Prompt</h3>
              <p>{generatedContent}</p>
            </section>
          )}
        </section>

        
        <section className="right-section">
          <h2>Enter Contexts or Upload Files</h2>
          <textarea
            placeholder="Enter your context..."
            // value={userContext}
            // onChange={(e) => setUserContext(e.target.value)}
          />
          <label htmlFor="file-upload" className="file-upload-label">
            <span>Upload </span>
            <input
              type="file"
              id="file-upload"
              accept=".csv, .txt"
              onChange={handleFileUpload}
            />
          </label>
        </section>
      </main>
    </div>
  );
};

export default App;














