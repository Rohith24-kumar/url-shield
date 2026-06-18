import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './styles/App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import FeaturesPage from './pages/FeaturesPage';
import HistoryPage from './pages/HistoryPage';
import AboutPage from './pages/AboutPage';

function App() {
  const [scanHistory, setScanHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('scanHistory');
    if (stored) {
      try {
        setScanHistory(JSON.parse(stored));
      } catch(e) {}
    }
  }, []);

  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="main-content-pro">
          <Routes>
            {/* Home page - this opens by default */}
            <Route path="/" element={
              <HomePage 
                scanHistory={scanHistory}
                setScanHistory={setScanHistory}
              />
            } />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/history" element={
              <HistoryPage 
                scanHistory={scanHistory}
                setScanHistory={setScanHistory}
              />
            } />
            <Route path="/about" element={<AboutPage />} />
            
            {/* Redirect any unknown routes to home page */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;