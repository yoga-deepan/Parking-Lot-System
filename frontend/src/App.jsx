import { useState } from 'react'
import Dashboard from './components/Dashboard'
import ParkVehicle from './components/ParkVehicle'
import ExitVehicle from './components/ExitVehicle'
import './App.css'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')

  return (
    <div className="app">
      <header className="header">
        <h1>🚗 Parking Lot Management</h1>
        <p>Manage your parking slots efficiently</p>
      </header>

      <nav className="nav-tabs">
        <button 
          className={activeTab === 'dashboard' ? 'active' : ''} 
          onClick={() => setActiveTab('dashboard')}
        >
          📊 Dashboard
        </button>
        <button 
          className={activeTab === 'park' ? 'active' : ''} 
          onClick={() => setActiveTab('park')}
        >
          🅿️ Park Vehicle
        </button>
        <button 
          className={activeTab === 'exit' ? 'active' : ''} 
          onClick={() => setActiveTab('exit')}
        >
          🚪 Exit Vehicle
        </button>
      </nav>

      <main className="main-content">
        {activeTab === 'dashboard' && <Dashboard />}
        {activeTab === 'park' && <ParkVehicle />}
        {activeTab === 'exit' && <ExitVehicle />}
      </main>

      <footer className="footer">
        <p>© 2026 Parking Lot Management System</p>
      </footer>
    </div>
  )
}

export default App
