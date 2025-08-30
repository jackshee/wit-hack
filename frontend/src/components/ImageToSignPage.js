import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import Tesseract from 'tesseract.js';
import Navbar from './Navbar';

const ImageToSignPage = () => {
  const navigate = useNavigate();
  
  // Image and OCR state
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [detectedText, setDetectedText] = useState('');
  const [ocrConfidence, setOcrConfidence] = useState(0);
  
  // Translation state
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);

  // Initialize Tesseract.js worker for OCR processing
  const [tesseractWorker, setTesseractWorker] = useState(null);

  // Initialize Tesseract worker when component mounts
  useEffect(() => {
    const initTesseract = async () => {
      try {
        // Create a Tesseract worker for OCR processing
        const worker = await Tesseract.createWorker('eng', 1, {
          logger: m => console.log('Tesseract:', m) // Log progress for debugging
        });
        setTesseractWorker(worker);
        console.log('Tesseract worker initialized successfully');
      } catch (error) {
        console.error('Failed to initialize Tesseract:', error);
      }
    };

    initTesseract();

    // Cleanup worker when component unmounts
    return () => {
      if (tesseractWorker) {
        tesseractWorker.terminate();
      }
    };
  }, [tesseractWorker]);

  // Handle image file selection
  const handleImageSelect = useCallback((event) => {
    const file = event.target.files[0];
    if (file) {
      console.log('Image selected:', file.name, 'Size:', file.size, 'bytes');
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
      setSelectedImage(file);
      
      // Clear previous results
      setDetectedText('');
      setOcrConfidence(0);
      setTranslationResult(null);
      
      console.log('Image preview created and previous results cleared');
    }
  }, []);

  // Process image with OCR
  const processImageWithOCR = useCallback(async () => {
    if (!selectedImage || !tesseractWorker) {
      console.log('Cannot process: no image or Tesseract worker not ready');
      return;
    }

    setIsProcessing(true);
    setDetectedText('');
    setOcrConfidence(0);
    
    try {
      console.log('Starting OCR processing for image:', selectedImage.name);
      
      // Use Tesseract.js to recognize text in the image
      const result = await tesseractWorker.recognize(selectedImage);
      
      console.log('OCR completed successfully');
      console.log('Full result:', result);
      
      // Extract the recognized text and confidence
      const text = result.data.text.trim();
      const confidence = result.data.confidence;
      
      console.log('Extracted text:', text);
      console.log('Confidence:', confidence);
      
      setDetectedText(text);
      setOcrConfidence(confidence);
      
      console.log('OCR results updated in state');
      
    } catch (error) {
      console.error('OCR processing error:', error);
      setDetectedText('OCR processing failed. Please try again.');
      setOcrConfidence(0);
    } finally {
      setIsProcessing(false);
    }
  }, [selectedImage, tesseractWorker]);

  // Handle translation to sign language
  const handleTranslateToSign = async () => {
    if (!detectedText) {
      alert('No text detected. Please process an image first.');
      return;
    }
    
    setIsTranslating(true);
    
    try {
      // Call the backend API to get translation
      const response = await fetch('http://localhost:8000/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: detectedText })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setTranslationResult({
        text: detectedText,
        videoUrl: data.video_url,
        prompt: `Sign language translation for: "${detectedText}"`
      });
      
      console.log('Translation successful:', data);
      
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Clear all results and start fresh
  const handleClearAndRestart = () => {
    setSelectedImage(null);
    setImagePreview(null);
    setDetectedText('');
    setOcrConfidence(0);
    setTranslationResult(null);
    
    // Clear file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    console.log('All results cleared, ready for new image');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // Ref for file input
  const fileInputRef = useRef(null);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="image-to-sign" />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-600 text-white py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <button 
            onClick={handleBackToHome}
            className="inline-flex items-center space-x-2 bg-white/20 hover:bg-white/30 text-white px-4 py-2 rounded-full transition-all duration-200 border border-white/30 mb-6"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span>Back to Home</span>
          </button>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-bold mb-4 leading-tight">
            Image to Sign Language
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Upload a static image with text for better OCR accuracy
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Image Upload Section */}
          <div className="card bg-content-bg mb-8">
            <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6">
              Upload Image
            </h2>
            
            <div className="text-center">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
                id="image-upload"
              />
              
              <label htmlFor="image-upload" className="btn-primary inline-block cursor-pointer">
                {imagePreview ? '📷 Change Image' : '📁 Choose Image File'}
              </label>
              
              <p className="text-text/70 mt-4 text-sm">
                Supported formats: JPG, PNG, GIF, BMP<br/>
                For best OCR results, use clear, high-contrast images with readable text
              </p>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="mt-8 text-center">
                <h3 className="text-xl font-heading font-semibold text-text mb-4">Image Preview</h3>
                <div className="inline-block bg-background rounded-lg p-4">
                  <img 
                    src={imagePreview} 
                    alt="Preview of selected image" 
                    className="max-w-full h-auto max-h-64 rounded-lg shadow-md"
                  />
                  <div className="mt-3 text-sm text-text/70">
                    <p>File: {selectedImage?.name}</p>
                    <p>Size: {(selectedImage?.size / 1024).toFixed(1)} KB</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* OCR Processing Section */}
          {selectedImage && (
            <div className="card bg-content-bg mb-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6">
                Text Recognition
              </h2>
              
              <div className="text-center">
                <button 
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={processImageWithOCR}
                  disabled={isProcessing || !tesseractWorker}
                >
                  {isProcessing ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Processing...</span>
                    </div>
                  ) : (
                    '🔍 Extract Text with OCR'
                  )}
                </button>
                
                {isProcessing && (
                  <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                    <p className="text-text font-medium">Processing image with Tesseract.js...</p>
                    <p className="text-text/70 text-sm">This may take a few seconds depending on image size and complexity.</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* OCR Results Section */}
          {detectedText && (
            <div className="card bg-content-bg mb-8">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6">
                Detected Text
              </h2>
              
              <div className="bg-background rounded-lg p-6 mb-6">
                <pre className="text-text whitespace-pre-wrap font-mono text-sm">{detectedText}</pre>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-lg font-semibold text-primary">{ocrConfidence.toFixed(1)}%</p>
                  <p className="text-sm text-text/70">Confidence</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-lg font-semibold text-primary">{detectedText.length}</p>
                  <p className="text-sm text-text/70">Characters</p>
                </div>
                <div className="bg-background rounded-lg p-4 text-center">
                  <p className="text-lg font-semibold text-primary">{detectedText.split(/\s+/).filter(word => word.length > 0).length}</p>
                  <p className="text-sm text-text/70">Words</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  className="btn-primary text-lg px-8 py-4 disabled:opacity-50 disabled:cursor-not-allowed"
                  onClick={handleTranslateToSign}
                  disabled={isTranslating}
                >
                  {isTranslating ? (
                    <div className="flex items-center justify-center space-x-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Translating...</span>
                    </div>
                  ) : (
                    '🎯 Translate to Sign'
                  )}
                </button>
                
                <button 
                  className="btn-secondary text-lg px-8 py-4"
                  onClick={handleClearAndRestart}
                >
                  Clear & Start Over
                </button>
              </div>
            </div>
          )}

          {/* Video Display Section */}
          {translationResult && (
            <div className="card bg-content-bg">
              <h2 className="text-2xl sm:text-3xl font-heading font-bold text-text mb-6">
                Sign Language Translation
              </h2>
              <div className="bg-background rounded-lg p-6">
                <VideoDisplay 
                  isTranslating={isTranslating}
                  translationResult={translationResult}
                  placeholderText="Translation will appear here"
                  placeholderSubtext="Your extracted text is being converted to sign language"
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default ImageToSignPage; 