import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import VideoDisplay from './VideoDisplay';
import LiveScanButton from './LiveScanButton';
import Tesseract from 'tesseract.js';
import Navbar from './Navbar';

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
  }, [tesseractWorker]);

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
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Navbar currentPage="video-to-sign" />

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
            Live Text Scanner
          </h1>
          <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Point your camera at text and hold the scan button for live OCR detection
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Camera Section */}
          <div className="card bg-content-bg mb-8">
            <div className="text-center mb-6">
              {!isCameraActive ? (
                <button className="btn-primary text-lg px-8 py-4" onClick={startCamera}>
                  📷 Start Camera
                </button>
              ) : (
                <div className="space-y-4">
                  <button className="btn-secondary text-lg px-8 py-4" onClick={stopCamera}>
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
            <div className="relative bg-black rounded-lg overflow-hidden">
              {isCameraActive ? (
                <>
                  {/* Mobile Back Button */}
                  <button 
                    className="fixed top-20 left-4 z-50 bg-black/70 text-white border border-white/30 rounded-full w-12 h-12 text-xl cursor-pointer hover:bg-black/90 transition-colors duration-200 md:hidden"
                    onClick={handleBackToHome}
                  >
                    ←
                  </button>
                  
                  <video 
                    ref={videoRef} 
                    autoPlay 
                    playsInline 
                    muted
                    className="w-full h-auto max-h-96 mx-auto block"
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
                    <div className="absolute inset-0 flex items-center justify-center text-white text-center z-10">
                      <div>
                        <p className="mb-2">Camera active but video not displaying</p>
                        <p className="text-sm mb-4">Check console for errors</p>
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
                          className="bg-white/20 hover:bg-white/30 text-white border border-white/30 px-4 py-2 rounded-lg cursor-pointer transition-colors duration-200"
                        >
                          Retry Video
                        </button>
                      </div>
                    </div>
                  )}
                  
                  {/* Debug Info */}
                  <div className="bg-gray-800/80 text-white p-3 text-xs text-left">
                    <strong>Debug Info:</strong><br/>
                    Camera Active: {isCameraActive ? 'Yes' : 'No'}<br/>
                    Stream: {stream ? 'Connected' : 'None'}<br/>
                    Video Element: {videoRef.current ? 'Exists' : 'None'}<br/>
                    Video Ready: {videoRef.current?.readyState || 'Unknown'}<br/>
                    Video Dimensions: {videoRef.current?.videoWidth || '0'} x {videoRef.current?.videoHeight || '0'}
                  </div>
                </>
              ) : (
                <div className="py-16 text-center text-white">
                  <div className="text-6xl mb-4">📷</div>
                  <p className="text-lg mb-2">Camera not active</p>
                  <p className="text-sm opacity-80">Click "Start Camera" to begin</p>
                </div>
              )}
            </div>

            {/* Live Text Display */}
            {isScanning && (
              <div className="mt-6 p-4 bg-secondary/20 rounded-lg">
                <h4 className="text-lg font-semibold text-text mb-3">🔍 Live Detection:</h4>
                <div className="bg-background rounded-lg p-4">
                  {liveText ? (
                    <p className="text-text font-medium">{liveText}</p>
                  ) : (
                    <p className="text-text/70">
                      {isProcessing ? 'Processing...' : 'Point camera at text...'}
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Instructions */}
            <div className="mt-6 p-4 bg-background rounded-lg">
              <h3 className="text-lg font-semibold text-text mb-3">How to use:</h3>
              <ol className="text-text/80 space-y-1 text-sm">
                <li>1. Start your camera</li>
                <li>2. Point it at text you want to scan</li>
                <li>3. <strong>Hold down</strong> the "Hold to Scan" button</li>
                <li>4. Move the camera over the text - it will detect automatically</li>
                <li>5. Release the button when you're done scanning</li>
                <li>6. Click "Translate to Sign" to convert the detected text</li>
              </ol>
            </div>
          </div>

          {/* Final Text Section */}
          {finalText && (
            <div className="card bg-content-bg mb-8">
              <h3 className="text-xl font-heading font-semibold text-text mb-4">📝 Final Text to Translate:</h3>
              <div className="bg-background rounded-lg p-4 mb-4">
                <pre className="text-text whitespace-pre-wrap font-mono text-sm">{finalText}</pre>
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
              <h3 className="text-xl font-heading font-semibold text-text mb-4">Sign Language Translation</h3>
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

export default VideoToSignPage; 