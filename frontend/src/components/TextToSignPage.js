import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import axios from 'axios';
import Navbar from './Navbar';

const TextToSignPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [message, setMessage] = useState('');

  // Pre-populate input text if coming from VideoToSignPage
  useEffect(() => {
    if (location.state?.text) {
      setInputText(location.state.text);
    }
  }, [location.state]);

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text to translate.');
      return;
    }

    setIsTranslating(true);
    setMessage('');

    try {
      // Call the backend API to get translation
      const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8000';
      const response = await axios.post(`${backendUrl}/api/translate`, {
        text: inputText
      });
      
      // Display status message to user
      if (response.data.status === 'fallback') {
        setMessage(`⚠️ ${response.data.message} - ${response.data.error_details}`);
      } else if (response.data.status === 'error') {
        setMessage(`❌ ${response.data.message} - ${response.data.error_details}`);
      } else {
        setMessage(`✅ ${response.data.message}`);
      }
      
      setTranslationResult({
        text: inputText,
        videoUrl: response.data.video_url,
        prompt: `Sign language translation for: "${inputText}"`
      });
      
    } catch (error) {
      setMessage(`Translation failed: ${error.response?.data?.detail || error.message || 'Unknown error'}`);
    } finally {
      setIsTranslating(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="translator" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 border border-white/30 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight">
            Text to Sign Language Translator
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Transform your text into sign language videos instantly
          </p>
        </div>
      </section>

      {/* Translator Section */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {message && (
            <div className={`p-4 mb-8 rounded-lg text-center font-medium ${
              message.includes('✅') 
                ? 'bg-success/20 text-success border border-success/30' 
                : message.includes('⚠️')
                ? 'bg-secondary/20 text-secondary border border-secondary/30'
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {message}
            </div>
          )}

          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Text Input Area */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-4">
                  Enter Your Text
                </h2>
                <p className="text-text/70 mb-6">
                  Type or paste the text you want to translate to sign language
                </p>
              </div>
              
              <div className="space-y-4">
                <textarea
                  placeholder="Type or paste the text you want to translate to sign language..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  disabled={isTranslating}
                  className="form-input min-h-[200px] resize-none"
                />
                <button 
                  className="btn-primary w-full text-lg py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleTranslate}
                  disabled={isTranslating || !inputText.trim()}
                >
                  {isTranslating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Translating...</span>
                    </div>
                  ) : (
                    'Translate to Sign Language'
                  )}
                </button>
              </div>
            </div>

            {/* Video Display Area */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-4">
                  Sign Language Video
                </h2>
                <p className="text-text/70">
                  Your translated sign language video will appear here
                </p>
              </div>
              
              <div className="bg-content-bg rounded-xl p-6 border border-gray-200">
                <VideoDisplay 
                  isTranslating={isTranslating}
                  translationResult={translationResult}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextToSignPage; 