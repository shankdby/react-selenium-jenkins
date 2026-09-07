import React, { useState } from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App" style={{ fontFamily: 'Segoe UI, Arial, sans-serif', padding: '40px' }}>
      <h1 id="app-title">DevOps Experiment 5 - React Selenium Test App</h1>
      <p id="app-subtitle">
        Task 2: React application UI validated with Selenium WebDriverJS, Mocha and Chai
      </p>

      <div id="counter-section">
        <button id="increment-btn" onClick={() => setCount(count + 1)}>
          Increment
        </button>
        <span id="count-value" style={{ marginLeft: '12px', fontWeight: 'bold' }}>
          {count}
        </span>
      </div>

      <p id="status-message">Pipeline stages: Checkout - Install - Build - Test</p>
    </div>
  );
}

export default App;
