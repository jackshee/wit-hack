import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

const TechnologyPage = () => {
  const navigate = useNavigate();

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="technology" />

      {/* Technology Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-16 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-heading font-bold mb-6 leading-tight">
            Our Technology
          </h1>
          <p className="text-lg sm:text-xl lg:text-2xl max-w-4xl mx-auto leading-relaxed opacity-95">
            Discover how Dougie.ai combines cutting-edge AI with accessibility innovation 
            to bridge communication gaps and make the world more inclusive.
          </p>
        </div>
      </section>

      {/* Translation Process Section */}
      <section className="py-16 sm:py-24 bg-content-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text text-center mb-12">
              How It Works
            </h2>
            <div className="space-y-8">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text mb-3">
                    Input Processing
                  </h3>
                  <p className="text-text/70 text-lg leading-relaxed">
                    Our system accepts text, video, or image inputs and processes them using 
                    advanced AI algorithms to understand the content with context to translate as accurately as possible.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text mb-3">
                    Translation Engine
                  </h3>
                  <p className="text-text/70 text-lg leading-relaxed">
                    The AI engine converts the processed content into AUSLAN, considering 
                    cultural context, age-appropriateness, and linguistic accuracy.
                  </p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                <div className="flex-shrink-0 w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white font-bold text-2xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl sm:text-2xl font-heading font-semibold text-text mb-3">
                    Output Generation
                  </h3>
                  <p className="text-text/70 text-lg leading-relaxed">
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
      <section className="py-16 sm:py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold text-text mb-12">
              Key Features
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
              <div className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                  Real-time Processing
                </h3>
                <p className="text-text/70 text-lg leading-relaxed">
                  Fast and efficient translation that works in real-time, making communication 
                  seamless and natural.
                </p>
              </div>
              
              <div className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                  Cultural Accuracy
                </h3>
                <p className="text-text/70 text-lg leading-relaxed">
                  Developed with input from the deaf community to ensure cultural sensitivity 
                  and appropriate translations.
                </p>
              </div>
              
              <div className="card p-8 text-center hover:shadow-lg transition-shadow duration-300">
                <h3 className="text-xl font-heading font-semibold text-primary mb-4">
                  Multi-format Support
                </h3>
                <p className="text-text/70 text-lg leading-relaxed">
                  Handles text, video, and image inputs, providing flexibility for different 
                  communication needs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Back to Home Button */}
      <section className="py-16 bg-content-bg">
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

export default TechnologyPage; 