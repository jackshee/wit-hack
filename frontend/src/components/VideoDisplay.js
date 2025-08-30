import React from 'react';

const VideoDisplay = ({ 
  isTranslating, 
  translationResult, 
  placeholderText = "Enter text on the left to see the sign language translation here",
  placeholderSubtext = "Perfect for children's books, simple phrases, and everyday communication"
}) => {
  if (isTranslating) {
    return (
      <div className="video-placeholder">
        <div style={{ fontSize: '2rem', marginBottom: '20px' }}>⏳</div>
        <p>Generating sign language translation...</p>
        <p style={{ fontSize: '0.9rem', color: '#888' }}>
          This may take a few moments
        </p>
      </div>
    );
  }

  if (translationResult) {
    return (
      <div className="video-placeholder">
        <h3 style={{ marginBottom: '20px', color: '#333' }}>Translation Result</h3>
        <p style={{ marginBottom: '15px', fontWeight: '600' }}>
          "{translationResult.text}"
        </p>
        <video 
          controls 
          autoPlay 
          muted
          style={{ maxWidth: '100%', borderRadius: '8px' }}
        >
          <source src={translationResult.videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <p style={{ 
          marginTop: '15px', 
          fontSize: '0.9rem', 
          color: '#666',
          fontStyle: 'italic'
        }}>
          {translationResult.prompt}
        </p>
      </div>
    );
  }

  return (
    <div className="video-placeholder">
      <div style={{ fontSize: '3rem', marginBottom: '20px' }}>👋</div>
      <p>{placeholderText}</p>
      <p style={{ fontSize: '0.9rem', color: '#888', marginTop: '10px' }}>
        {placeholderSubtext}
      </p>
    </div>
  );
};

export default VideoDisplay; 