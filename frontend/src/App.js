import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TextToSignPage from './components/TextToSignPage';
import VideoToSignPage from './components/VideoToSignPage';
import ImageToSignPage from './components/ImageToSignPage';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/translator" element={<TextToSignPage />} />
          <Route path="/video-to-sign" element={<VideoToSignPage />} />
          <Route path="/image-to-sign" element={<ImageToSignPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 