import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import LiveScanButton from './LiveScanButton';
import Tesseract from 'tesseract.js';

const VideoToSignPage = () => {
  const navigate = useNavigate();
  
  // Camera and video state
  const [stream, setStream] = useState(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isVideoDisplaying, setIsVideoDisplaying] = useState(false); // Track if video is actually displaying
  
  // OCR processing state
  const [isScanning, setIsScanning] = useState(false); // Whether live scanning is active
  const [isProcessing, setIsProcessing] = useState(false); // Whether OCR is currently running
  const [liveText, setLiveText] = useState(''); // Current detected text from live scanning
  const [finalText, setFinalText] = useState(''); // Final text user wants to translate
  
  // Translation state
  const [isTranslating, setIsTranslating] = useState(false);
  const [translationResult, setTranslationResult] = useState(null);

  // Initialize Tesseract.js worker for OCR processing
  const [tesseractWorker, setTesseractWorker] = useState(null);

  // Refs for DOM elements and processing control
  const videoRef = useRef(null);
  const scanningIntervalRef = useRef(null); // Controls the continuous scanning loop
  const lastProcessedTextRef = useRef(''); // Prevents duplicate processing of same text
  const isScanningRef = useRef(false); // Track scanning state in real-time (fixes closure issue)

  // Initialize Tesseract worker when component mounts
  useEffect(() => {
    const initTesseract = async () => {
      try {
        // Create a Tesseract worker for OCR processing
        // This worker will handle the text recognition in the background
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

  // Cleanup function to stop scanning and clear intervals
  const cleanupScanning = useCallback(() => {
    if (scanningIntervalRef.current) {
      clearInterval(scanningIntervalRef.current);
      scanningIntervalRef.current = null;
    }
    setIsScanning(false);
    isScanningRef.current = false; // Update ref to match state
    setIsProcessing(false);
  }, []);

  // Cleanup when component unmounts or camera stops
  useEffect(() => {
    return () => {
      cleanupScanning();
    };
  }, [cleanupScanning]);

  // Function to start the camera stream
  const startCamera = useCallback(async () => {
    try {
      // Request access to the user's camera
      // 'facingMode: "environment"' prefers the rear camera on mobile devices
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { 
          facingMode: 'environment',
          width: { ideal: 1920 },
          height: { ideal: 1080 }
        }
      });
      
      console.log('Camera stream obtained:', stream);
      console.log('Stream tracks:', stream.getTracks());
      
      // Set stream first, then handle video element
      setStream(stream);
      setIsCameraActive(true);
      
      // Use setTimeout to ensure state updates before accessing video element
      setTimeout(() => {
        if (videoRef.current) {
          console.log('Setting video srcObject');
          videoRef.current.srcObject = stream;
          
          // Ensure video loads and plays
          videoRef.current.onloadedmetadata = () => {
            console.log('Video metadata loaded');
            console.log('Video dimensions:', videoRef.current.videoWidth, 'x', videoRef.current.videoHeight);
            
            // Force play the video
            videoRef.current.play().then(() => {
              console.log('Video started playing successfully');
            }).catch(e => {
              console.log('Auto-play failed, trying user interaction:', e);
            });
          };
          
          videoRef.current.oncanplay = () => {
            console.log('Video can play');
          };
          
          videoRef.current.onplay = () => {
            console.log('Video is now playing');
            setIsVideoDisplaying(true); // Video is now displaying
          };
          
          videoRef.current.onerror = (e) => {
            console.error('Video error:', e);
            setIsVideoDisplaying(false);
          };
          
          videoRef.current.onLoadStart = () => {
            console.log('Video load started');
          };
          
          videoRef.current.onLoadedData = () => {
            console.log('Video data loaded');
            setIsVideoDisplaying(true); // Video data is loaded and displaying
          };
          
          // Force load the video
          videoRef.current.load();
        }
      }, 100);
      
      console.log('Camera started successfully');
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert('Failed to access camera. Please check permissions.');
    }
  }, []);

  // Function to stop the camera stream
  const stopCamera = useCallback(() => {
    if (stream) {
      // Stop all tracks in the stream (video, audio if any)
      stream.getTracks().forEach(track => track.stop());
      
      // Clear the video element
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      
      setStream(null);
      setIsCameraActive(false);
      setIsVideoDisplaying(false); // Reset video display state
      
      // Stop any ongoing scanning
      cleanupScanning();
      
      // Clear detected text
      setLiveText('');
      setFinalText('');
      setTranslationResult(null);
      
      console.log('Camera stopped successfully');
    }
  }, [stream, cleanupScanning]);

  // Function to process a single frame with Tesseract.js
  const processFrameWithOCR = useCallback(async (canvas) => {
    if (!tesseractWorker || isProcessing) {
      return null; // Don't process if worker isn't ready or already processing
    }

    try {
      setIsProcessing(true);
      
      // Use Tesseract.js to recognize text in the image
      // The worker processes the canvas element directly
      const result = await tesseractWorker.recognize(canvas);
      
      // Extract the recognized text
      const detectedText = result.data.text.trim();
      
      return detectedText;
      
    } catch (error) {
      console.error('OCR processing error:', error);
      return null;
    } finally {
      setIsProcessing(false);
    }
  }, [tesseractWorker, isProcessing]);

  // Function to start continuous live scanning
  const startLiveScanning = useCallback(() => {
    if (!isCameraActive || !tesseractWorker || scanningIntervalRef.current) {
      return; // Don't start if conditions aren't met
    }

    setIsScanning(true);
    isScanningRef.current = true; // Update ref immediately to fix closure issue
    
    // Set up continuous frame processing
    // Process frames every 500ms (2 FPS) to balance responsiveness and performance
    scanningIntervalRef.current = setInterval(async () => {
      // Use ref instead of state to avoid closure issue
      if (!videoRef.current || !isScanningRef.current) {
        return;
      }

      try {
        // Create a canvas element to capture the current video frame
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        
        // Draw the current video frame onto the canvas
        const ctx = canvas.getContext('2d');
        ctx.drawImage(videoRef.current, 0, 0);
        
        // Process the frame with OCR
        const detectedText = await processFrameWithOCR(canvas);
        
        if (detectedText && detectedText !== lastProcessedTextRef.current) {
          // Only update if we got new text (prevents flickering)
          setLiveText(detectedText);
          lastProcessedTextRef.current = detectedText;
          console.log('🔍 Live Text Detected:', detectedText);
        }
        
      } catch (error) {
        console.error('Frame processing error:', error);
      }
    }, 500); // 500ms interval = 2 FPS
    
  }, [isCameraActive, tesseractWorker, processFrameWithOCR]);

  // Function to stop live scanning
  const stopLiveScanning = useCallback(() => {
    setIsScanning(false);
    isScanningRef.current = false; // Update ref immediately to fix closure issue
    
    cleanupScanning();
    
    // Set the final text to the last detected text
    if (liveText) {
      setFinalText(liveText);
    }
  }, [cleanupScanning, liveText]);

  // Function to handle mouse/touch events for live scanning
  const handleScanStart = useCallback(() => {
    startLiveScanning();
  }, [startLiveScanning]);

  const handleScanStop = useCallback(() => {
    stopLiveScanning();
  }, [stopLiveScanning]);

  // Function to handle translation to sign language
  const handleTranslateToSign = async () => {
    const textToTranslate = finalText || liveText;
    
    if (!textToTranslate) {
      alert('No text detected. Please scan some text first.');
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
        body: JSON.stringify({ text: textToTranslate })
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      setTranslationResult({
        text: textToTranslate,
        videoUrl: data.video_url,
        prompt: `Sign language translation for: "${textToTranslate}"`
      });
      
      console.log('Translation successful:', data);
      
    } catch (error) {
      console.error('Translation error:', error);
      alert('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  // Function to clear all results and start fresh
  const handleClearAndRestart = () => {
    setLiveText('');
    setFinalText('');
    setTranslationResult(null);
    lastProcessedTextRef.current = '';
    console.log('Cleared all results');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="video-to-sign-page">
      {/* Header Section */}
      <header className="page-header">
        <div className="container">
          <button className="back-button" onClick={handleBackToHome}>
            ← Back to Home
          </button>
          <h1>Live Text Scanner</h1>
          <p>Point your camera at text and hold the scan button for live OCR detection</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="main-content">
        <div className="container">
          {/* Camera Section */}
          <div className="camera-section">
            <div className="camera-controls">
              {!isCameraActive ? (
                <button className="btn btn-primary camera-btn" onClick={startCamera}>
                  📷 Start Camera
                </button>
              ) : (
                <div className="camera-buttons">
                  <button className="btn btn-secondary camera-btn" onClick={stopCamera}>
                    🛑 Stop Camera
                  </button>
                  
                  {/* Live Scanning Controls */}
                  <LiveScanButton
                    isCameraActive={isCameraActive}
                    tesseractWorker={tesseractWorker}
                    onScanStart={handleScanStart}
                    onScanStop={handleScanStop}
                    isScanning={isScanning}
                  />
                </div>
              )}
            </div>

            {/* Camera View */}
            <div className="camera-view">
              {isCameraActive ? (
                <>
                  {/* Mobile Back Button */}
                  <button 
                    className="mobile-back-btn"
                    onClick={handleBackToHome}
                    style={{
                      position: 'fixed',
                      top: '20px',
                      left: '20px',
                      zIndex: 1001,
                      background: 'rgba(0, 0, 0, 0.7)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '50%',
                      width: '50px',
                      height: '50px',
                      fontSize: '20px',
                      cursor: 'pointer',
                      display: 'none'
                    }}
                  >
                    ←
                  </button>
                  
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className="camera-video"
                    style={{
                      width: '100%',
                      height: 'auto',
                      maxWidth: '100%',
                      display: 'block'
                    }}
                    onLoadedMetadata={() => {
                      console.log('Video metadata loaded');
                      console.log('Video dimensions:', videoRef.current?.videoWidth, 'x', videoRef.current?.videoHeight);
                    }}
                    onCanPlay={() => {
                      console.log('Video can play');
                      if (videoRef.current) {
                        videoRef.current.play().catch(e => console.log('Auto-play failed:', e));
                      }
                    }}
                    onError={(e) => {
                      console.error('Video error:', e);
                    }}
                    onLoadStart={() => {
                      console.log('Video load started');
                    }}
                    onLoadedData={() => {
                      console.log('Video data loaded');
                    }}
                  />
                  
                  {/* Fallback if video doesn't show */}
                  {stream && !isVideoDisplaying && (
                    <div style={{
                      position: 'absolute',
                      top: '50%',
                      left: '50%',
                      transform: 'translate(-50%, -50%)',
                      color: 'white',
                      textAlign: 'center',
                      zIndex: 1000
                    }}>
                      <p>Camera active but video not displaying</p>
                      <p>Check console for errors</p>
                      <button 
                        onClick={() => {
                          if (videoRef.current && stream) {
                            videoRef.current.srcObject = stream;
                            videoRef.current.load();
                            // Set a timeout to check if video is now displaying
                            setTimeout(() => {
                              if (videoRef.current && videoRef.current.videoWidth > 0) {
                                setIsVideoDisplaying(true);
                              }
                            }, 500);
                          }
                        }}
                        style={{
                          background: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          border: '1px solid white',
                          padding: '10px 20px',
                          borderRadius: '5px',
                          cursor: 'pointer'
                        }}
                      >
                        Retry Video
                      </button>
                    </div>
                  )}
                  
                  {/* Debug Info */}
                  <div style={{ 
                    background: '#f0f0f0', 
                    padding: '10px', 
                    margin: '10px 0', 
                    borderRadius: '5px',
                    fontSize: '12px',
                    textAlign: 'left'
                  }}>
                    <strong>Debug Info:</strong><br/>
                    Camera Active: {isCameraActive ? 'Yes' : 'No'}<br/>
                    Stream: {stream ? 'Connected' : 'None'}<br/>
                    Video Element: {videoRef.current ? 'Exists' : 'None'}<br/>
                    Video Ready: {videoRef.current?.readyState || 'Unknown'}<br/>
                    Video Dimensions: {videoRef.current?.videoWidth || '0'} x {videoRef.current?.videoHeight || '0'}
                  </div>
                </>
              ) : (
                <div className="camera-placeholder">
                  <div className="placeholder-icon">📷</div>
                  <p>Camera not active</p>
                  <p>Click "Start Camera" to begin</p>
                </div>
              )}
            </div>

            {/* Live Text Display */}
            {isScanning && (
              <div className="live-text-display">
                <h4>🔍 Live Detection:</h4>
                <div className="live-text-content">
                  {liveText ? (
                    <p className="detected-text">{liveText}</p>
                  ) : (
                    <p className="scanning-indicator">
                      {isProcessing ? 'Processing...' : 'Point camera at text...'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="instructions">
              <h3>How to use:</h3>
              <ol>
                <li>Start your camera</li>
                <li>Point it at text you want to scan</li>
                <li><strong>Hold down</strong> the "Hold to Scan" button</li>
                <li>Move the camera over the text - it will detect automatically</li>
                <li>Release the button when you're done scanning</li>
                <li>Click "Translate to Sign" to convert the detected text</li>
              </ol>
            </div>
          </div>

          {/* Final Text Section */}
          {finalText && (
            <div className="final-text-section">
              <h3>📝 Final Text to Translate:</h3>
              <div className="text-display">
                <pre>{finalText}</pre>
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
              <h3>Sign Language Translation</h3>
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

export default VideoToSignPage; 