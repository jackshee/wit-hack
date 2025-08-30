import React from 'react';
import { useNavigate } from 'react-router-dom';

const TechnologyPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div>
      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo-section">
              <div className="logo-placeholder">Logo</div>
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

      {/* Technology Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Our Technology</h1>
          <p>
            Discover how Dougie.ai combines cutting-edge AI with accessibility innovation 
            to bridge communication gaps and make the world more inclusive.
          </p>
        </div>
      </section>



      {/* Translation Process Section */}
      <section className="process-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>How It Works</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: '#007bff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}>
                  1
                </div>
                <div>
                  <h3 style={{ marginBottom: '10px' }}>Input Processing</h3>
                  <p style={{ color: '#555' }}>
                    Our system accepts text, video, or image inputs and processes them using 
                    advanced AI algorithms to understand the content with context to translate as accurately as possible.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: '#007bff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}>
                  2
                </div>
                <div>
                  <h3 style={{ marginBottom: '10px' }}>Translation Engine</h3>
                  <p style={{ color: '#555' }}>
                    The AI engine converts the processed content into AUSLAN, considering 
                    cultural context, age-appropriateness, and linguistic accuracy.
                  </p>
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                <div style={{ 
                  width: '50px', 
                  height: '50px', 
                  backgroundColor: '#007bff', 
                  borderRadius: '50%', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: '20px'
                }}>
                  3
                </div>
                <div>
                  <h3 style={{ marginBottom: '10px' }}>Output Generation</h3>
                  <p style={{ color: '#555' }}>
                    The output is displayed and the system generates high-quality sign language videos that accurately 
                    represent the original content in AUSLAN.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section" style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Key Features</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px', marginTop: '40px' }}>
              <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Real-time Processing</h3>
                <p style={{ color: '#555' }}>
                  Fast and efficient translation that works in real-time, making communication 
                  seamless and natural.
                </p>
              </div>
              <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Cultural Accuracy</h3>
                <p style={{ color: '#555' }}>
                  Developed with input from the deaf community to ensure cultural sensitivity 
                  and appropriate translations.
                </p>
              </div>
              <div style={{ padding: '20px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Multi-format Support</h3>
                <p style={{ color: '#555' }}>
                  Handles text, video, and image inputs, providing flexibility for different 
                  communication needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <section style={{ padding: '40px 0', textAlign: 'center' }}>
        <div className="container">
          <button 
            onClick={handleBackToHome}
            className="btn btn-primary"
            style={{ fontSize: '18px', padding: '15px 30px' }}
          >
            Back to Home
          </button>
        </div>
      </section>
    </div>
  );
};

export default TechnologyPage;
