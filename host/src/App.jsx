import React, { useState, useEffect, Suspense } from 'react';
import './App.css';

const Remote1App = React.lazy(() => 
  import('remote1/App').catch(err => {
    console.error('Failed to load Remote1:', err);
    return { default: () => <div style={{padding: '2rem', color: 'red'}}>Error loading Remote 1: {err.message}</div> };
  })
);

const Remote2App = React.lazy(() => 
  import('remote2/App').catch(err => {
    console.error('Failed to load Remote2:', err);
    return { default: () => <div style={{padding: '2rem', color: 'red'}}>Error loading Remote 2: {err.message}</div> };
  })
);

function App() {
  const [services, setServices] = useState({
    host: { name: 'Host', status: 'running', port: 5000, tech: 'React' },
    remote1: { name: 'Remote 1', status: 'checking', port: 5001, tech: 'React' },
    remote2: { name: 'Remote 2', status: 'checking', port: 5002, tech: 'Vue' },
  });

  const [selectedRemote, setSelectedRemote] = useState(null);

  useEffect(() => {
    // Check service status
    const checkServices = async () => {
      const checkService = async (port) => {
        try {
          const response = await fetch(`http://localhost:${port}`, { 
            method: 'HEAD',
            mode: 'no-cors',
          });
          return 'running';
        } catch (error) {
          return 'stopped';
        }
      };

      const remote1Status = await checkService(5001);
      const remote2Status = await checkService(5002);

      setServices(prev => ({
        ...prev,
        remote1: { ...prev.remote1, status: remote1Status },
        remote2: { ...prev.remote2, status: remote2Status },
      }));
    };

    checkServices();
    const interval = setInterval(checkServices, 5000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'running':
        return '#10b981';
      case 'stopped':
        return '#ef4444';
      default:
        return '#f59e0b';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'running':
        return '●';
      case 'stopped':
        return '●';
      default:
        return '○';
    }
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Micro Frontend Demo</h1>
        <p>Module Federation with React & Vue</p>
      </header>

      <div className="container">
        <div className="services-grid">
          {Object.entries(services).map(([key, service]) => (
            <div key={key} className="service-card">
              <div className="service-header">
                <h3>{service.name}</h3>
                <span className="tech-badge">{service.tech}</span>
              </div>
              <div className="service-info">
                <div className="status-row">
                  <span 
                    className="status-indicator" 
                    style={{ color: getStatusColor(service.status) }}
                  >
                    {getStatusIcon(service.status)}
                  </span>
                  <span className="status-text">{service.status}</span>
                </div>
                <div className="port-info">Port: {service.port}</div>
              </div>
              {key !== 'host' && service.status === 'running' && (
                <button 
                  className="load-btn"
                  onClick={() => setSelectedRemote(selectedRemote === key ? null : key)}
                >
                  {selectedRemote === key ? '✕ Hide' : '⚡ Launch'} {service.tech} App
                </button>
              )}
              {key !== 'host' && service.status === 'stopped' && (
                <div className="service-note">
                  Start with: <code>npm run dev:{key}</code>
                </div>
              )}
              {selectedRemote === key && service.status === 'running' && (
                <div className="launched-app">
                  <div className="launch-message">
                    ✓ {service.tech} App Launched Successfully
                  </div>
                  <Suspense fallback={<div className="loading">Loading remote module...</div>}>
                    {key === 'remote1' && <Remote1App />}
                    {key === 'remote2' && <Remote2App />}
                  </Suspense>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="info-section">
          <h2>How to Use</h2>
          <ol>
            <li>Install dependencies: <code>npm install</code></li>
            <li>Start all services: <code>npm run dev</code></li>
            <li>Or start individually:
              <ul>
                <li><code>npm run dev:host</code> (this app)</li>
                <li><code>npm run dev:remote1</code> (React remote)</li>
                <li><code>npm run dev:remote2</code> (Vue remote)</li>
              </ul>
            </li>
            <li>Click "Load" buttons to dynamically import remote modules</li>
          </ol>
        </div>
      </div>
    </div>
  );
}

export default App;
