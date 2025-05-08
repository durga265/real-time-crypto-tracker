import React, { useState } from 'react';
import CryptoTable from './components/CryptoTable';
import './App.css'; 

function App() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-logo">CryptoTracker</div>
        <div className={`navbar-links ${menuOpen ? 'active' : ''}`}>
          <a href="#">Home</a>
          <a href="#">Markets</a>
          <a href="#">Contact</a>
        </div>
        <div className="hamburger" onClick={toggleMenu}>
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>
      </nav>

      <h1 className="main-title">Real-Time Crypto Price Tracker</h1>
      <CryptoTable />
    </div>
  );
}

export default App;
