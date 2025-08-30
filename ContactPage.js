import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitMessage('');

    // Simulate form submission
    setTimeout(() => {
      setSubmitMessage('Thank you for your message! We will get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

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

      {/* Contact Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1>Contact Us</h1>
          <p>
            Get in touch with our team. We'd love to hear from you and answer any questions 
            about Dougie.ai and our accessibility technology.
          </p>
        </div>
      </section>

      {/* Contact Information Section */}
      <section className="contact-info-section" style={{ padding: '60px 0', backgroundColor: '#f8f9fa' }}>
        <div className="container">
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <h2>Get In Touch</h2>
            <p style={{ fontSize: '18px', lineHeight: '1.6', color: '#555', marginBottom: '40px' }}>
              Whether you have questions about our technology, want to collaborate, or simply 
              want to learn more about making the world more accessible, we're here to help.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '30px' }}>
              <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Email</h3>
                <p style={{ color: '#555', marginBottom: '10px' }}>hello@dougie.ai</p>
                <p style={{ color: '#666', fontSize: '14px' }}>We typically respond within 24 hours</p>
              </div>
              <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Location</h3>
                <p style={{ color: '#555', marginBottom: '10px' }}>Melbourne, Australia</p>
                <p style={{ color: '#666', fontSize: '14px' }}>Based at University of Melbourne & RMIT</p>
              </div>
              <div style={{ padding: '25px', backgroundColor: 'white', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                <h3 style={{ color: '#007bff', marginBottom: '15px' }}>Social Media</h3>
                <p style={{ color: '#555', marginBottom: '10px' }}>Follow our journey</p>
                <p style={{ color: '#666', fontSize: '14px' }}>Updates on accessibility tech</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="contact-form-section" style={{ padding: '60px 0' }}>
        <div className="container">
          <div style={{ maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '40px' }}>Send Us a Message</h2>
            <form onSubmit={handleSubmit} style={{ backgroundColor: '#f8f9fa', padding: '40px', borderRadius: '15px' }}>
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="name" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Name *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="email" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '20px' }}>
                <label htmlFor="subject" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px'
                  }}
                />
              </div>
              
              <div style={{ marginBottom: '25px' }}>
                <label htmlFor="message" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#333' }}>
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  required
                  rows="5"
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #ddd',
                    borderRadius: '5px',
                    fontSize: '16px',
                    resize: 'vertical'
                  }}
                />
              </div>
              
              {submitMessage && (
                <div style={{ 
                  padding: '15px', 
                  marginBottom: '20px', 
                  borderRadius: '5px',
                  backgroundColor: '#d4edda',
                  color: '#155724',
                  border: '1px solid #c3e6cb',
                  textAlign: 'center'
                }}>
                  {submitMessage}
                </div>
              )}
              
              <button 
                type="submit" 
                className="btn btn-primary"
                style={{ 
                  width: '100%', 
                  fontSize: '18px', 
                  padding: '15px 30px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '5px',
                  cursor: 'pointer'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
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

export default ContactPage;
