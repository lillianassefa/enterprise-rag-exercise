
import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [taskDescription, setTaskDescription] = useState('');

  const handleGeneratePrompts = () => {
    // Your logic for prompt generation
    // For demonstration purposes, let's add a sample prompt and test case
    const newPrompt = "Generate a creative response.";
    const newTestCase = "Evaluate if the response is creative.";

    // Add your logic for handling generated prompts and test cases if needed

    // For now, let's just log them to the console
    console.log('Generated Prompt:', newPrompt);
    console.log('Generated Test Case:', newTestCase);
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
    </div>
  );
};

export default App;

