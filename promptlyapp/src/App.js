// App.js
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [generatedPrompts, setGeneratedPrompts] = useState([]);
  const [generatedTestCases, setGeneratedTestCases] = useState([]);

  const handleGeneratePrompts = () => {
    // Your logic for prompt generation
    // For demonstration purposes, let's add a sample prompt and test case
    const newPrompt = "Generate a creative response.";
    const newTestCase = "Evaluate if the response is creative.";

    setGeneratedPrompts([...generatedPrompts, newPrompt]);
    setGeneratedTestCases([...generatedTestCases, newTestCase]);
  };

  return (
    <div className="app">
      <section className="user-input">
        <h2>User Input</h2>
        <textarea
          placeholder="Enter your task description..."
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
        />
        <button onClick={handleGeneratePrompts}>Generate Prompts</button>
      </section>

      <section className="generated-prompts">
        <h2>Generated Prompts</h2>
        <ul>
          {generatedPrompts.map((prompt, index) => (
            <li key={index}>{prompt}</li>
          ))}
        </ul>
      </section>

      <section className="test-case-generation">
        <h2>Test Case Generation</h2>
        <ul>
          {generatedTestCases.map((testCase, index) => (
            <li key={index}>{testCase}</li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default App;

