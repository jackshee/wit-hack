import React from 'react';
import { useNavigate } from 'react-router-dom';

const AboutPage = () => {
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
              <a href="#technology">Our Technology</a>
              <a href="#about">About</a>
              <a onClick={() => navigate('/insights')} style={{ cursor: 'pointer' }}>Insights</a>
              <a onClick={() => navigate('/contact')} style={{ cursor: 'pointer' }}>Contact</a>
            </nav>
          </div>
        </div>
      </header>

      {/* About Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>About Dougie.ai</h1>
          <p>
            Dougie.ai bridges the gap between spoken, written, and signed language.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section" style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Our Mission</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555' }}>
              Dougie.ai was founded with a simple yet powerful vision: to bridge the communication 
              gap between hearing and deaf communities through innovative AI technology. By converting text, 
              video, and images into AUSLAN, we make communication, learning, and everyday interactions 
              more inclusive and accessible for everyone. We chose an animated character as our "face" 
              to keep the sense of wonder, the curiosity of learning, and the spirit of helping alive—connecting 
              people across all ages.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="story-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2>Our Story</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
              Dougie.ai began when four individuals came together with a shared vision: to bring people closer, 
              make the world more accessible, and assist those in need. We wanted to create something that could 
              truly help bridge communication gaps and make everyday interactions easier for everyone.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
              After exploring different ideas, we identified a target audience for our product and started putting 
              in the hours—researching, brainstorming, and building a platform that could make a real difference. 
              Through dedication, collaboration, and a focus on inclusivity, we developed Dougie.ai: a tool that 
              translates text, video, and images into AUSLAN, helping people connect, learn, and communicate more effectively.
            </p>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '20px' }}>
              Our journey is just beginning, but every step we take is guided by the belief that technology can 
              empower, include, and bring people together—no matter their abilities or age.
            </p>
          </div>
        </div>
      </section>



      {/* Team Section */}
      <section className="team-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Our Team</h2>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginBottom: '30px' }}>
              We're a group of students brought together by curiosity, creativity, and a shared desire to make a meaningful impact. 
              We chose this project because it sparked our passion and gave us the chance to research, learn, and build something that could help others.
            </p>
            <div style={{ textAlign: 'left', maxWidth: '600px', margin: '0 auto' }}>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#007bff', marginBottom: '5px' }}>Alexis</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                  Information Technology, University of Melbourne – IT student focused on software development and innovative tech.
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#007bff', marginBottom: '5px' }}>Jack</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                  Computer Software & Biomedical Background, University of Melbourne – Undergraduate combining software skills with biomedical insights to tackle real-world challenges.
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#007bff', marginBottom: '5px' }}>Soumya</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                  Data Science, University of Melbourne – Undergraduate exploring AI and data-driven solutions.
                </p>
              </div>
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ color: '#007bff', marginBottom: '5px' }}>Gia</h3>
                <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#555' }}>
                  Mechatronics Engineering, RMIT – Undergraduate passionate about robotics, design, and problem-solving.
                </p>
              </div>
            </div>
            <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555', marginTop: '30px' }}>
              Together, we bring our curiosity, dedication, and teamwork to Dougie.ai, building a platform that reflects our enthusiasm for research, learning, and creating solutions that matter.
            </p>
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

export default AboutPage;
