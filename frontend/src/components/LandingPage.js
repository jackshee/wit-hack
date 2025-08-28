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

  const handleTryNow = () => {
    navigate('/translator');
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Sign Language Translator</h1>
          <p>
            Making children's books accessible to deaf and hard-of-hearing children 
            by translating text into sign language videos. Our AI-powered platform 
            helps create inclusive reading experiences for all children.
          </p>
          <button className="btn" onClick={handleTryNow}>
            Try Now
          </button>
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