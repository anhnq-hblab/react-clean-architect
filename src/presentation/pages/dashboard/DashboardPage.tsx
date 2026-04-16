import React from 'react';
import './DashboardPage.css';

/**
 * Dashboard Page - Example protected page
 */
export const DashboardPage: React.FC = () => {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </header>

      <div className="dashboard-content">
        <div className="dashboard-card">
          <h3>🏛️ Clean Architecture</h3>
          <p>Domain layer is independent of frameworks</p>
        </div>

        <div className="dashboard-card">
          <h3>📊 MVVM Pattern</h3>
          <p>ViewModels handle presentation logic</p>
        </div>

        <div className="dashboard-card">
          <h3>🔄 Redux Toolkit</h3>
          <p>Centralized state management</p>
        </div>

        <div className="dashboard-card">
          <h3>⚡ Vite + React</h3>
          <p>Fast development experience</p>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
