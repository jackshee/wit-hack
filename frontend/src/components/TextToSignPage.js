import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import axios from 'axios';

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
      const response = await axios.post('http://localhost:8000/api/translate', {
        text: inputText
      });
      
      setTranslationResult({
        text: inputText,
        videoUrl: response.data.video_url,
        prompt: `Sign language translation for: "${inputText}"`
      });
    } catch (error) {
      console.error('Translation error:', error);
      setMessage('Translation failed. Please try again.');
    } finally {
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
              <h3>Enter Text</h3>
              <textarea
                placeholder="Type or paste the text you want to translate to sign language..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                disabled={isTranslating}
              />
              <button 
                className="btn btn-primary" 
                onClick={handleTranslate}
                disabled={isTranslating || !inputText.trim()}
                style={{ marginTop: '20px', width: '100%' }}
              >
                {isTranslating ? 'Translating...' : 'Translate to Sign Language'}
              </button>
            </div>

            {/* Video Display Area */}
            <div className="video-area">
              <VideoDisplay 
                isTranslating={isTranslating}
                translationResult={translationResult}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TextToSignPage; 