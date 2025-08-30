import React, { useState } from 'react';
import logoImage from '../assets/images/logo.png';

const Navbar = ({ currentPage = 'home' }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const isActivePage = (page) => {
    return currentPage === page;
  };

  return (
    <>
      {/* Header */}
      <header className="bg-content-bg shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <img 
                src={logoImage} 
                alt="Dougie.ai Logo" 
                className="w-10 h-10 object-contain"
              />
              <span className="text-2xl font-heading font-bold text-text">Dougie.ai</span>
            </div>
            <nav className="hidden md:flex space-x-8">
              <a 
                href="/" 
                className={`transition-colors duration-200 font-medium ${
                  isActivePage('home') 
                    ? 'text-primary font-semibold' 
                    : 'text-text hover:text-primary'
                }`}
              >
                Home
              </a>
              <a 
                href="/#technology" 
                className="text-text hover:text-primary transition-colors duration-200 font-medium"
              >
                Our Technology
              </a>
              <a 
                href="/#about" 
                className="text-text hover:text-primary transition-colors duration-200 font-medium"
              >
                About
              </a>
              <a 
                href="/#partners" 
                className="text-text hover:text-primary transition-colors duration-200 font-medium"
              >
                Partners
              </a>
              <a 
                href="/#media" 
                className="text-text hover:text-primary transition-colors duration-200 font-medium"
              >
                Media
              </a>
              <a 
                href="/#insights" 
                className="text-text hover:text-primary transition-colors duration-200 font-medium"
              >
                Insights
              </a>
              <a 
                href="/contact" 
                className={`transition-colors duration-200 font-medium ${
                  isActivePage('contact') 
                    ? 'text-primary font-semibold' 
                    : 'text-text hover:text-primary'
                }`}
              >
                Contact
              </a>
            </nav>
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg bg-primary text-white hover:bg-blue-600 transition-colors duration-200"
              onClick={toggleMobileMenu}
              aria-label="Toggle mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-50" onClick={closeMobileMenu}>
          <div className="absolute top-0 right-0 w-64 h-full bg-content-bg shadow-xl transform transition-transform duration-300 ease-in-out">
            <div className="p-6">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <img 
                    src={logoImage} 
                    alt="Dougie.ai Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="text-xl font-heading font-bold text-text">Dougie.ai</span>
                </div>
                <button 
                  onClick={closeMobileMenu}
                  className="p-2 rounded-lg hover:bg-gray-100 transition-colors duration-200"
                >
                  <svg className="w-5 h-5 text-text" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <nav className="space-y-4">
                <a 
                  href="/" 
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActivePage('home')
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-text hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Home
                </a>
                <a 
                  href="/#technology" 
                  className="block py-3 px-4 text-text hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Our Technology
                </a>
                <a 
                  href="/#about" 
                  className="block py-3 px-4 text-text hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  About
                </a>
                <a 
                  href="/#partners" 
                  className="block py-3 px-4 text-text hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Partners
                </a>
                <a 
                  href="/#media" 
                  className="block py-3 px-4 text-text hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Media
                </a>
                <a 
                  href="/#insights" 
                  className="block py-3 px-4 text-text hover:text-primary hover:bg-gray-50 rounded-lg transition-all duration-200 font-medium"
                  onClick={closeMobileMenu}
                >
                  Insights
                </a>
                <a 
                  href="/contact" 
                  className={`block py-3 px-4 rounded-lg transition-all duration-200 font-medium ${
                    isActivePage('contact')
                      ? 'text-primary bg-primary/10 font-semibold'
                      : 'text-text hover:text-primary hover:bg-gray-50'
                  }`}
                  onClick={closeMobileMenu}
                >
                  Contact
                </a>
              </nav>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar; 