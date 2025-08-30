import React, { useState } from 'react';
import Navbar from './Navbar';

const ContactPage = () => {
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

    try {
      // Simulate form submission (since we don't have backend)
      setTimeout(() => {
        setSubmitMessage('Thank you for your message! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 1000);
    } catch (error) {
      setSubmitMessage('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="contact" />

      {/* Contact Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Contact Us
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">
            We are looking for AUSLAN experts and beta-testers to help us develop our technology 
            further to suit the user needs. If you're interested in contributing to making 
            children's books more accessible to deaf and hard-of-hearing children, we'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold text-text mb-6">
                  Get in Touch
                </h2>
                <p className="text-lg text-text/70 leading-relaxed">
                  Whether you're an AUSLAN expert looking to contribute your knowledge, 
                  a potential beta-tester interested in trying our platform, or simply 
                  want to learn more about our mission, we're here to help.
                </p>
              </div>
              
              <div className="space-y-6">
                <div className="card bg-content-bg">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                    For AUSLAN Experts
                  </h3>
                  <p className="text-text/80 leading-relaxed">
                    Help us improve our sign language translations and ensure cultural 
                    and linguistic accuracy in our platform.
                  </p>
                </div>
                
                <div className="card bg-content-bg">
                  <h3 className="text-xl font-heading font-semibold text-primary mb-3">
                    For Beta-Testers
                  </h3>
                  <p className="text-text/80 leading-relaxed">
                    Try our platform early and provide valuable feedback to help us 
                    create the best possible user experience.
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="card bg-content-bg">
              <h3 className="text-2xl font-heading font-bold text-text mb-8 text-center">
                Send us a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="form-label">Full Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="form-label">Email Address *</label>
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
                
                <div>
                  <label htmlFor="subject" className="form-label">Subject *</label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select a subject</option>
                    <option value="auslan-expert">AUSLAN Expert Inquiry</option>
                    <option value="beta-tester">Beta Testing Interest</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="general">General Inquiry</option>
                    <option value="feedback">Feedback</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="message" className="form-label">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="5"
                    placeholder="Tell us more about how you'd like to help or what you'd like to know..."
                    className="form-input resize-none"
                    required
                  />
                </div>
                
                {submitMessage && (
                  <div className={`p-4 rounded-lg font-medium ${
                    submitMessage.includes('Thank you') 
                      ? 'bg-success/20 text-success border border-success/30' 
                      : 'bg-red-100 text-red-700 border border-red-300'
                  }`}>
                    {submitMessage}
                  </div>
                )}
                
                <button 
                  type="submit" 
                  className="btn-primary w-full text-lg py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Sending Message...' : 'Send Message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage; 