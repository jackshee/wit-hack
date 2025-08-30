import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const InsightsPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="insights" />

      {/* Content Section */}
      <section className="py-16 sm:py-24 bg-content-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                The Problem We're Addressing
              </h2>
              <p className="text-lg leading-relaxed text-text/70">
                Communication gaps make learning, storytelling, and everyday interactions challenging for those who rely on sign language. Many media formats—text, video, images—lack accessible AUSLAN translations, limiting engagement and inclusion.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                Inspiration Behind Dougie.ai
              </h2>
              <p className="text-lg leading-relaxed text-text/70">
                Dougie, our animated character, was inspired by a children's show featuring a deaf protagonist. The episode, told entirely in sign language and based on a real-life family, highlighted how little support exists to make deaf children feel included. The show's success demonstrated both the need and the power of representation, bringing attention to how exclusion is often normalized from a young age.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                Beyond Childhood
              </h2>
              <p className="text-lg leading-relaxed text-text/70">
                The challenges faced by deaf children can continue into adulthood. Many grow up feeling isolated, and navigating a world that doesn't fully accommodate them can be daunting. With Dougie.ai, we want to remind adults who have experienced exclusion that this doesn't have to be the norm. Our platform is designed to foster connection, understanding, and participation at any age.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                Our Approach
              </h2>
              <p className="text-lg leading-relaxed text-text/70">
                Dougie.ai translates text, video, and images into AUSLAN, combining AI technology with thoughtful design. We focused on building a frontend that's intuitive and engaging while developing backend solutions capable of handling multiple media types efficiently.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                Team Learnings & Development
              </h2>
              <p className="text-lg leading-relaxed text-text/70">
                Working across engineering, IT, and software development, we learned how to merge technical feasibility with user-centered design. Challenges like translation accuracy and seamless media processing shaped our iterative approach, helping us refine the platform for real-world use.
              </p>
            </div>

            <div className="mb-12">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-primary mb-6">
                Potential Impact
              </h2>
              <p className="text-lg leading-relaxed text-text/70">
                Dougie.ai aims to expand access to communication and learning, giving users the tools to engage with content in AUSLAN quickly and easily. By bridging gaps in accessibility, we hope to create a world where inclusion isn't an afterthought—but a standard.
              </p>
            </div>
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

export default InsightsPage; 