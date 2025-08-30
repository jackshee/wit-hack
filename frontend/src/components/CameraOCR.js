// Import the necessary hooks from React.
// useState is for managing state.
// useRef is for getting a reference to a DOM element (like the <video> tag).
// useCallback is for memoizing functions to prevent unnecessary re-renders.
import React, { useState, useRef, useCallback } from 'react';

// Define the functional component.
function CameraOCR() {
    // State to hold the text extracted by the OCR. Initialized to an empty string.
    const [ocrResult, setOcrResult] = useState('');
    // State to track if the OCR process is running, to show a loading message.
    const [isLoading, setIsLoading] = useState(false);
    // State to hold the camera stream object, to be able to stop it later.
    const [stream, setStream] = useState(null);

    // useRef creates a reference that we can attach to the <video> element.
    // This allows us to directly access its properties and methods.
    const videoRef = useRef(null);

    // This function requests access to the user's camera.
    // useCallback ensures the function isn't recreated on every render unless its dependencies change.
    const startCamera = useCallback(async () => {
        try {
            // Request the video stream from the browser's media devices.
            // 'facingMode: "environment"' prefers the rear camera on mobile devices.
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { facingMode: 'environment' }
            });
            
            // If we get the stream, attach it to our <video> element to display it.
            if (videoRef.current) {
                videoRef.current.srcObject = stream;
            }
            // Store the stream in our state so we can stop it later.
            setStream(stream);
        } catch (err) {
            console.error("Error accessing camera: ", err);
        }
    }, []); // The empty dependency array [] means this function is created only once.

    // This function captures a frame from the video, sends it to the backend, and gets the result.
    const captureAndProcessImage = useCallback(async () => {
        // If there's no video stream, do nothing.
        if (!videoRef.current) return;
        
        // Set loading state to true to provide user feedback.
        setIsLoading(true);

        // Create a hidden <canvas> element to draw the current video frame onto.
        const canvas = document.createElement('canvas');
        canvas.width = videoRef.current.videoWidth;
        canvas.height = videoRef.current.videoHeight;
        canvas.getContext('2d').drawImage(videoRef.current, 0, 0);

        // Convert the canvas image into a Blob (a file-like object).
        canvas.toBlob(async (blob) => {
            // Create a FormData object to send the image as a multipart/form-data request.
            const formData = new FormData();
            formData.append('file', blob, 'capture.png');

            try {
                // Send the image to our FastAPI backend endpoint.
                const response = await fetch('http://localhost:8000/api/ocr', {
                    method: 'POST',
                    body: formData,
                });
                const data = await response.json();
                // Update our state with the text returned from the backend.
                setOcrResult(data.text);
            } catch (error) {
                console.error("Error processing OCR: ", error);
                setOcrResult('Failed to process image.');
            } finally {
                // Set loading state back to false when the process is complete.
                setIsLoading(false);
            }
        }, 'image/png');
    }, []); // This function also only needs to be created once.

    // This function stops the camera stream.
    const stopCamera = useCallback(() => {
        if (stream) {
            // Get all tracks from the stream and stop each one.
            stream.getTracks().forEach(track => track.stop());
            // Clear the stream from the video element and our state.
            if (videoRef.current) {
                videoRef.current.srcObject = null;
            }
            setStream(null);
        }
    }, [stream]); // This function depends on the 'stream' state.

    // This is the JSX that gets rendered to the screen.
    return (
        <div>
            <h2>Camera OCR</h2>
            <div>
                <button onClick={startCamera}>Start Camera</button>
                <button onClick={stopCamera}>Stop Camera</button>
            </div>
            
            {/* The ref attribute connects our videoRef to this <video> element. */}
            <video ref={videoRef} autoPlay playsInline style={{ width: '100%', maxWidth: '500px', marginTop: '10px' }}></video>
            
            <button onClick={captureAndProcessImage} disabled={isLoading || !stream}>
                {isLoading ? 'Processing...' : 'Capture & Read Text'}
            </button>
            
            {/* Conditionally render the results section if ocrResult has text. */}
            {ocrResult && (
                <div>
                    <h3>OCR Result:</h3>
                    {/* The <pre> tag preserves whitespace and line breaks from the OCR result. */}
                    <pre>{ocrResult}</pre>
                </div>
            )}
        </div>
    );
}

export default CameraOCR;