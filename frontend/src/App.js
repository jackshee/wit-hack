import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TranslatorPage from './components/TranslatorPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/translator" element={<TranslatorPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 