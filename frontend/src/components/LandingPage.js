import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from './Navbar';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isLoginMode, setIsLoginMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAuthenticating(true);
    setMessage('');

    try {
      if (isLoginMode) {
        // Simulate login (since we don't have backend)
        setTimeout(() => {
          setMessage('Login successful! Redirecting to your profile...');
          // Redirect to profile page after successful login
          setTimeout(() => {
            navigate('/profile');
          }, 1500);
        }, 1000);
      } else {
        // Simulate signup (since we don't have backend)
        setTimeout(() => {
          setMessage('Signup successful! Redirecting to your profile...');
          // Redirect to profile page after successful signup
          setTimeout(() => {
            navigate('/profile');
          }, 1500);
        }, 1000);
      }
      
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.detail || `${isLoginMode ? 'Login' : 'Signup'} failed. Please try again.`);
    } finally {
      setIsAuthenticating(false);
    }
  };

  const toggleMode = () => {
    setIsLoginMode(!isLoginMode);
    setMessage('');
    setFormData({ username: '', email: '', password: '' });
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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="home" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Sign Language Translator
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">
            Making children's books accessible to deaf and hard-of-hearing children 
            by translating text into sign language videos. Our AI-powered platform 
            helps create inclusive reading experiences for all children.
          </p>
        </div>
      </section>

      {/* Try Now Section */}
      <section className="py-16 sm:py-24 bg-content-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text mb-12">
            Try Now
          </h2>
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
            <button 
              className="btn-primary text-lg px-8 py-4 w-full sm:w-auto"
              onClick={handleTextToSign}
            >
              Text to Sign
            </button>
            <button 
              className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              onClick={handleImageToSign}
            >
              Image to Sign
            </button>
            <button 
              className="btn-secondary text-lg px-8 py-4 w-full sm:w-auto"
              onClick={handleVideoToSign}
            >
              Video to Sign
            </button>
          </div>
        </div>
      </section>

      {/* Authentication Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text mb-4">
                {isLoginMode ? 'Welcome Back!' : 'Get Started Today'}
              </h2>
              <p className="text-lg text-text/70 leading-relaxed">
                {isLoginMode ? 'Sign in to access your reading dashboard' : 'Create an account to track your reading progress'}
              </p>
            </div>
            
            <div className="flex bg-content-bg rounded-xl p-1 mb-8 max-w-xs mx-auto">
              <button 
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  !isLoginMode 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsLoginMode(false)}
              >
                Sign Up
              </button>
              <button 
                className={`flex-1 py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
                  isLoginMode 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-text hover:text-primary'
                }`}
                onClick={() => setIsLoginMode(true)}
              >
                Log In
              </button>
            </div>

            <div className="card">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                {!isLoginMode && (
                  <div>
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="form-input"
                      required
                    />
                  </div>
                )}
                
                <div>
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                {message && (
                  <div className={`p-4 rounded-lg font-medium ${
                    message.includes('successful') 
                      ? 'bg-success/20 text-success border border-success/30' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {message}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="btn-primary w-full text-lg py-4"
                  disabled={isAuthenticating}
                >
                  {isAuthenticating 
                    ? (isLoginMode ? 'Signing In...' : 'Creating Account...') 
                    : (isLoginMode ? 'Sign In' : 'Sign Up')
                  }
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage; 