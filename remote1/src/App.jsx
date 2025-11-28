import React, { useState } from 'react';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="remote1-app">
      <div className="card">
        <h1>Remote 1 - React App</h1>
        <p className="subtitle">This component is loaded from port 5001</p>
        
        <div className="counter-section">
          <h2>Interactive Counter</h2>
          <div className="counter-display">{count}</div>
          <div className="button-group">
            <button onClick={() => setCount(count - 1)} className="btn btn-danger">
              − Decrement
            </button>
            <button onClick={() => setCount(0)} className="btn btn-secondary">
              Reset
            </button>
            <button onClick={() => setCount(count + 1)} className="btn btn-success">
              Increment +
            </button>
          </div>
        </div>

        <div className="info-box">
          <h3>✨ Features</h3>
          <ul>
            <li>Built with React 18</li>
            <li>Vite + Module Federation</li>
            <li>Dynamically loaded into Host</li>
            <li>Isolated state management</li>
          </ul>
        </div>

        <div className="tech-stack">
          <span className="tech-tag">React</span>
          <span className="tech-tag">Vite</span>
          <span className="tech-tag">Module Federation</span>
        </div>
      </div>
    </div>
  );
}

export default App;
