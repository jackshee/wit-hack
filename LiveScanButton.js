import React, { useState, useCallback, useEffect } from 'react';

const LiveScanButton = ({ 
  isCameraActive, 
  tesseractWorker, 
  onScanStart, 
  onScanStop, 
  isScanning,
  className = ''
}) => {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  // Handle mouse/touch events for live scanning
  const handleScanStart = useCallback(() => {
    console.log('Scan start detected');
    setIsButtonPressed(true);
    onScanStart();
  }, [onScanStart]);

  const handleScanStop = useCallback(() => {
    console.log('Scan stop detected');
    setIsButtonPressed(false);
    onScanStop();
  }, [onScanStop]);

  // Add global mouse event listeners for reliable button state tracking
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isButtonPressed) {
        console.log('Global mouse up detected, stopping scan');
        handleScanStop();
      }
    };

    const handleGlobalMouseLeave = () => {
      if (isButtonPressed) {
        console.log('Global mouse leave detected, stopping scan');
        handleScanStop();
      }
    };

    // Add global event listeners
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);

    // Cleanup event listeners
    return () => {
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
    };
  }, [isButtonPressed, handleScanStop]);

  // If camera is not active or Tesseract worker is not ready, show disabled button
  if (!isCameraActive || !tesseractWorker) {
    return (
      <button 
        className={`btn btn-primary scan-btn ${className}`}
        disabled={true}
      >
        🔍 Start Live Scanning
      </button>
    );
  }

  // If not currently scanning, show start button
  if (!isScanning) {
    return (
      <button 
        className={`btn btn-primary scan-btn ${className}`}
        onClick={handleScanStart}
      >
        🔍 Start Live Scanning
      </button>
    );
  }

  // If scanning, show hold-to-scan button
  return (
    <button 
      className={`btn scan-btn btn-warning scanning-active ${className}`}
      onMouseDown={handleScanStart}
      onMouseUp={handleScanStop}
      onMouseLeave={handleScanStop}
      onTouchStart={handleScanStart}
      onTouchEnd={handleScanStop}
      style={{ 
        userSelect: 'none',
        transform: isButtonPressed ? 'scale(0.95)' : 'scale(1)',
        transition: 'transform 0.1s ease'
      }}
    >
      🔍 {isButtonPressed ? 'Scanning... Release to Stop' : 'Hold to Scan (Release to Stop)'}
    </button>
  );
};

export default LiveScanButton; 