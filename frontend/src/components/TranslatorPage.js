import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const TranslatorPage = () => {
  const navigate = useNavigate();
  const [inputText, setInputText] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);
  const [message, setMessage] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) {
      setMessage('Please enter some text to translate.');
      return;
    }

    setIsTranslating(true);
    setMessage('');

    try {
      // For demo purposes, we'll simulate the translation
      // In a real app, this would call the backend API
      setTimeout(() => {
        setTranslationResult({
          text: inputText,
          videoUrl: '/assets/Elmo_Signs_How_Are_You_in_AUSLAN.mp4',
          prompt: `Sign language translation for: "${inputText}"`
        });
        setIsTranslating(false);
      }, 2000);
    } catch (error) {
      setMessage('Translation failed. Please try again.');
      setIsTranslating(false);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div>
      {/* Header */}
      <div style={{ 
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', 
        color: 'white', 
        padding: '20px 0',
        textAlign: 'center'
      }}>
        <div className="container">
          <h1 style={{ margin: '0', fontSize: '2rem' }}>Text to Sign Language Translator</h1>
          <button 
            onClick={handleBackToHome}
            style={{ 
              background: 'rgba(255,255,255,0.2)', 
              border: '1px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '20px',
              cursor: 'pointer',
              marginTop: '10px'
            }}
          >
            ← Back to Home
          </button>
        </div>
      </div>

      {/* Translator Section */}
      <section className="translator-section">
        <div className="container">
          <h2>Translate Your Text</h2>
          
          {message && (
            <div style={{ 
              padding: '15px', 
              marginBottom: '30px', 
              borderRadius: '8px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              border: '1px solid #f5c6cb',
              textAlign: 'center'
            }}>
              {message}
            </div>
          )}

          <div className="translator-grid">
            {/* Text Input Area */}
            <div className="text-input-area">
              <h3 style={{ marginBottom: '20px', color: '#333' }}>Enter Text</h3>
              <textarea
                placeholder="Type or paste the text you want to translate to sign language..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTranslating}
              />
              <button 
                className="btn" 
                onClick={handleTranslate}
                disabled={isTranslating || !inputText.trim()}
                style={{ marginTop: '20px', width: '100%' }}
              >
                {isTranslating ? 'Translating...' : 'Translate to Sign Language'}
              </button>
            </div>

            {/* Video Display Area */}
            <div className="video-area">
              {isTranslating ? (
                <div className="video-placeholder">
                  <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
                  <p>Generating sign language translation...</p>
                  <p style={{ fontSize: '0.9rem', color: '#888' }}>
                    This may take a few moments
                  </p>
                </div>
              ) : translationResult ? (
                <div className="video-placeholder">
                  <h3 style={{ marginBottom: '20px', color: '#333' }}>Translation Result</h3>
                  <p style={{ marginBottom: '15px', fontWeight: '600' }}>
                    "{translationResult.text}"
                  </p>
                  <video 
                    controls 
                    autoPlay 
                    muted
                    style={{ maxWidth: '100%', borderRadius: '8px' }}
                  >
                    <source src={translationResult.videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <p style={{ 
                    marginTop: '15px', 
                    fontSize: '0.9rem', 
                    color: '#666',
                    fontStyle: 'italic'
                  }}>
                    {translationResult.prompt}
                  </p>
                </div>
              ) : (
                <div className="video-placeholder">
                  <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👋</div>
                  <p>Enter text on the left to see the sign language translation here</p>
                  <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
                    Perfect for children's books, simple phrases, and everyday communication
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TranslatorPage; 