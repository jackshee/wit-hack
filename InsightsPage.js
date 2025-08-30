import React from 'react';
import { useNavigate } from 'react-router-dom';

const InsightsPage = () => {
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

      {/* Content Section */}
      <section style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '20px' }}>The Problem We're Addressing</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Communication gaps make learning, storytelling, and everyday interactions challenging for those who rely on sign language. Many media formats—text, video, images—lack accessible AUSLAN translations, limiting engagement and inclusion.
              </p>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Inspiration Behind Dougie.ai</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Dougie, our animated character, was inspired by a children's show featuring a deaf protagonist. The episode, told entirely in sign language and based on a real-life family, highlighted how little support exists to make deaf children feel included. The show's success demonstrated both the need and the power of representation, bringing attention to how exclusion is often normalized from a young age.
              </p>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Beyond Childhood</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                The challenges faced by deaf children can continue into adulthood. Many grow up feeling isolated, and navigating a world that doesn't fully accommodate them can be daunting. With Dougie.ai, we want to remind adults who have experienced exclusion that this doesn't have to be the norm. Our platform is designed to foster connection, understanding, and participation at any age.
              </p>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Our Approach</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Dougie.ai translates text, video, and images into AUSLAN, combining AI technology with thoughtful design. We focused on building a frontend that's intuitive and engaging while developing backend solutions capable of handling multiple media types efficiently.
              </p>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Team Learnings & Development</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Working across engineering, IT, and software development, we learned how to merge technical feasibility with user-centered design. Challenges like translation accuracy and seamless media processing shaped our iterative approach, helping us refine the platform for real-world use.
              </p>
            </div>

            <div style={{ marginBottom: '50px' }}>
              <h2 style={{ color: '#007bff', marginBottom: '20px' }}>Potential Impact</h2>
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#555' }}>
                Dougie.ai aims to expand access to communication and learning, giving users the tools to engage with content in AUSLAN quickly and easily. By bridging gaps in accessibility, we hope to create a world where inclusion isn't an afterthought—but a standard.
              </p>
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

export default InsightsPage;
