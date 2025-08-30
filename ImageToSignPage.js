import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import Tesseract from 'tesseract.js';

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
  }, []);

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
    <div className="image-to-sign-page">
      {/* Header Section */}
      <header className="page-header">
        <div className="container">
          <button className="back-button" onClick={handleBackToHome}>
            ← Back to Home
          </button>
          <h1>Image to Sign</h1>
          <p>Upload a static image with text for better OCR accuracy</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          {/* Image Upload Section */}
          <div className="image-upload-section">
            <h2>Upload Image</h2>
            
            <div className="upload-area">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageSelect}
                style={{ display: 'none' }}
                id="image-upload"
              />
              
              <label htmlFor="image-upload" className="upload-button">
                {imagePreview ? '📷 Change Image' : '📁 Choose Image File'}
              </label>
              
              <p className="upload-hint">
                Supported formats: JPG, PNG, GIF, BMP<br/>
                For best OCR results, use clear, high-contrast images with readable text
              </p>
            </div>

            {/* Image Preview */}
            {imagePreview && (
              <div className="image-preview">
                <h3>Image Preview</h3>
                <img 
                  src={imagePreview} 
                  alt="Selected image" 
                  className="preview-image"
                />
                <p className="image-info">
                  File: {selectedImage?.name}<br/>
                  Size: {(selectedImage?.size / 1024).toFixed(1)} KB
                </p>
              </div>
            )}
          </div>

          {/* OCR Processing Section */}
          {selectedImage && (
            <div className="ocr-section">
              <h2>Text Recognition</h2>
              
              <button 
                className="btn btn-primary process-btn"
                onClick={processImageWithOCR}
                disabled={isProcessing || !tesseractWorker}
              >
                {isProcessing ? '🔍 Processing...' : '🔍 Extract Text with OCR'}
              </button>
              
              {isProcessing && (
                <div className="processing-indicator">
                  <p>Processing image with Tesseract.js...</p>
                  <p>This may take a few seconds depending on image size and complexity.</p>
                </div>
              )}
            </div>
          )}

          {/* OCR Results Section */}
          {detectedText && (
            <div className="ocr-results-section">
              <h2>Detected Text</h2>
              
              <div className="text-display">
                <pre>{detectedText}</pre>
              </div>
              
              <div className="ocr-stats">
                <p><strong>Confidence:</strong> {ocrConfidence.toFixed(1)}%</p>
                <p><strong>Text Length:</strong> {detectedText.length} characters</p>
                <p><strong>Words:</strong> {detectedText.split(/\s+/).filter(word => word.length > 0).length}</p>
              </div>
              
              <div className="action-buttons">
                <button 
                  className="btn btn-primary translate-btn"
                  onClick={handleTranslateToSign}
                  disabled={isTranslating}
                >
                  {isTranslating ? 'Translating...' : '🎯 Translate to Sign'}
                </button>
                
                <button 
                  className="btn btn-secondary"
                  onClick={handleClearAndRestart}
                >
                  Clear & Start Over
                </button>
              </div>
            </div>
          )}

          {/* Video Display Section */}
          {translationResult && (
            <div className="video-display-section">
              <h2>Sign Language Translation</h2>
              <div className="video-area">
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
      </div>
    </div>
  );
};

export default ImageToSignPage; 