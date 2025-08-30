import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LandingPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsSigningUp(true);
    setMessage('');

    try {
      const response = await axios.post('/signup', formData);
      setMessage('Signup successful! You can now use the translator.');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.detail || 'Signup failed. Please try again.');
    } finally {
      setIsSigningUp(false);
    }
  };

  const handleTextToSign = () => {
    navigate('/translator');
  };

  const handleVideoToSign = () => {
    navigate('/video-to-sign');
  };

  const handleImageToSign = () => {
    navigate('/image-to-sign');
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <img 
                src="https://www.themarysue.com/wp-content/uploads/2024/05/dougie-turtleboy-bluey.jpeg?fit=1200%2C675" 
                alt="Dougie Turtle Boy Logo" 
                style={{ 
                  width: '50px', 
                  height: '50px', 
                  borderRadius: '5px',
                  objectFit: 'cover'
                }}
              />
              <span className="logo-text">Dougie.ai</span>
            </div>
            <nav className="nav-menu">
              <a onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>Home</a>
              <a onClick={() => navigate('/technology')} style={{ cursor: 'pointer' }}>Our Technology</a>
              <a onClick={() => navigate('/about')} style={{ cursor: 'pointer' }}>About</a>
              <a onClick={() => navigate('/insights')} style={{ cursor: 'pointer' }}>Insights</a>
              <a onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Sign Language Translator</h1>
          <p>
            Making children's books accessible to deaf and hard-of-hearing children 
            by translating text into sign language videos. Our AI-powered platform 
            helps create inclusive reading experiences for all children.
          </p>
        </div>
      </section>

      {/* Try Now Section */}
      <section className="try-now-section">
        <div className="container">
          <h1>Try Now</h1>
          <div className="button-group">
            <button className="btn btn-primary" onClick={handleTextToSign}>
              Text to Sign
            </button>
            <button className="btn btn-secondary" onClick={handleVideoToSign}>
              Video to Sign
            </button>
            <button className="btn btn-secondary" onClick={handleImageToSign}>
              Image to Sign
            </button>
          </div>
        </div>
      </section>

      {/* Signup Section */}
      <section className="signup-section">
        <div className="container">
          <h2>Get Started Today</h2>
          <div className="card" style={{ maxWidth: '500px', margin: '0 auto' }}>
            <form onSubmit={handleSignup}>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>
              
              {message && (
                <div style={{ 
                  padding: '10px', 
                  marginBottom: '20px', 
                  borderRadius: '5px',
                  backgroundColor: message.includes('successful') ? '#d4edda' : '#f8d7da',
                  color: message.includes('successful') ? '#155724' : '#721c24',
                  border: `1px solid ${message.includes('successful') ? '#c3e6cb' : '#f5c6cb'}`
                }}>
                  {message}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-secondary" 
                style={{ width: '100%' }}
                disabled={isSigningUp}
              >
                {isSigningUp ? 'Creating Account...' : 'Sign Up'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 