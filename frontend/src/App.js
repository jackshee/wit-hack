import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import TextToSignPage from './components/TextToSignPage';
import VideoToSignPage from './components/VideoToSignPage';
import ImageToSignPage from './components/ImageToSignPage';
import ProfilePage from './components/ProfilePage';
import ContactPage from './components/ContactPage';
import TechnologyPage from './components/TechnologyPage';
import AboutPage from './components/AboutPage';
import InsightsPage from './components/InsightsPage';
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
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/technology" element={<TechnologyPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/insights" element={<InsightsPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 