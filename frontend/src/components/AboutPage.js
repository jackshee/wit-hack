import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const AboutPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="about" />

      {/* About Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            About Dougie.ai
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">
            Dougie.ai bridges the gap between spoken, written, and signed language.
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 sm:py-24 bg-content-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text mb-8">
              Our Mission
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed text-text/70 max-w-3xl mx-auto">
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
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text text-center mb-12">
              Our Story
            </h2>
            <div className="space-y-6 text-lg leading-relaxed text-text/70">
              <p>
                Dougie.ai began when four individuals came together with a shared vision: to bring people closer, 
                make the world more accessible, and assist those in need. We wanted to create something that could 
                truly help bridge communication gaps and make everyday interactions easier for everyone.
              </p>
              <p>
                After exploring different ideas, we identified a target audience for our product and started putting 
                in the hours—researching, brainstorming, and building a platform that could make a real difference. 
                Through dedication, collaboration, and a focus on inclusivity, we developed Dougie.ai: a tool that 
                translates text, video, and images into AUSLAN, helping people connect, learn, and communicate more effectively.
              </p>
              <p>
                Our journey is just beginning, but every step we take is guided by the belief that technology can 
                empower, include, and bring people together—no matter their abilities or age.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 sm:py-24 bg-content-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text mb-8">
              Our Team
            </h2>
            <p className="text-lg sm:text-xl leading-relaxed text-text/70 mb-12 max-w-3xl mx-auto">
              We're a group of students brought together by curiosity, creativity, and a shared desire to make a meaningful impact. 
              We chose this project because it sparked our passion and gave us the chance to research, learn, and build something that could help others.
            </p>
            
            <div className="text-left max-w-2xl mx-auto space-y-6">
              <div className="card p-6">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Alexis</h3>
                <p className="text-text/70 leading-relaxed">
                  Information Technology, University of Melbourne – IT student focused on software development and innovative tech.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Jack</h3>
                <p className="text-text/70 leading-relaxed">
                  Computer Software & Biomedical Background, University of Melbourne – Undergraduate combining software skills with biomedical insights to tackle real-world challenges.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Soumya</h3>
                <p className="text-text/70 leading-relaxed">
                  Data Science, University of Melbourne – Undergraduate exploring AI and data-driven solutions.
                </p>
              </div>
              
              <div className="card p-6">
                <h3 className="text-xl font-heading font-semibold text-primary mb-3">Gia</h3>
                <p className="text-text/70 leading-relaxed">
                  Mechatronics Engineering, RMIT – Undergraduate passionate about robotics, design, and problem-solving.
                </p>
              </div>
            </div>
            
            <p className="text-lg sm:text-xl leading-relaxed text-text/70 mt-12 max-w-3xl mx-auto">
              Together, we bring our curiosity, dedication, and teamwork to Dougie.ai, building a platform that reflects our enthusiasm for research, learning, and creating solutions that matter.
            </p>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button 
            onClick={handleBackToHome}
            className="btn-primary text-lg px-8 py-4 hover:bg-blue-600 transition-colors duration-200"
          >
            Back to Home
          </button>
        </div>
      </section>
    </div>
  );
};

export default AboutPage; 