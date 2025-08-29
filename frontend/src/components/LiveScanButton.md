# LiveScanButton Component

A reusable React component that provides a live scanning button with hold-to-scan functionality for OCR applications.

## Features

- **Hold-to-Scan**: Requires continuous button press to maintain scanning
- **Visual Feedback**: Button changes appearance and text based on state
- **Touch Support**: Works on both desktop and mobile devices
- **Global Event Handling**: Reliably detects mouse up/leave events
- **State Management**: Handles all button states internally

## Props

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isCameraActive` | boolean | Yes | Whether the camera is currently active |
| `tesseractWorker` | object | Yes | Tesseract.js worker instance |
| `onScanStart` | function | Yes | Callback when scanning starts |
| `onScanStop` | function | Yes | Callback when scanning stops |
| `isScanning` | boolean | Yes | Whether scanning is currently active |
| `className` | string | No | Additional CSS classes |

## Usage

```jsx
import LiveScanButton from './LiveScanButton';

function MyComponent() {
  const [isScanning, setIsScanning] = useState(false);
  
  const handleScanStart = () => {
    setIsScanning(true);
    // Start OCR processing
  };
  
  const handleScanStop = () => {
    setIsScanning(false);
    // Stop OCR processing
  };
  
  return (
    <LiveScanButton
      isCameraActive={true}
      tesseractWorker={tesseractWorker}
      onScanStart={handleScanStart}
      onScanStop={handleScanStop}
      isScanning={isScanning}
    />
  );
}
```

## Button States

### 1. **Disabled State**
- Shows when camera is not active or Tesseract worker is not ready
- Button is disabled and shows "🔍 Start Live Scanning"

### 2. **Ready State**
- Shows when camera is active and ready to scan
- Click to start scanning
- Shows "🔍 Start Live Scanning"

### 3. **Scanning State**
- Shows when scanning is active
- Hold mouse button down to continue scanning
- Shows "🔍 Hold to Scan (Release to Stop)"
- Button has warning styling and pulsing animation

### 4. **Active Scanning State**
- Shows while mouse button is held down
- Shows "🔍 Scanning... Release to Stop"
- Button scales down slightly for visual feedback

## Event Handling

- **onMouseDown**: Starts scanning
- **onMouseUp**: Stops scanning
- **onMouseLeave**: Stops scanning (safety feature)
- **onTouchStart**: Starts scanning (mobile)
- **onTouchEnd**: Stops scanning (mobile)
- **Global mouseup**: Catches mouse up events anywhere on page
- **Global mouseleave**: Catches mouse leave events

## Styling

The component uses CSS classes that can be customized:
- `.scan-btn`: Base button styling
- `.scanning-active`: Active scanning state styling
- `.btn-warning`: Warning button variant

## Dependencies

- React (useState, useCallback, useEffect)
- CSS classes for styling (defined in App.css)

## Example Integration

```jsx
// In VideoToSignPage.js
<LiveScanButton
  isCameraActive={isCameraActive}
  tesseractWorker={tesseractWorker}
  onScanStart={handleScanStart}
  onScanStop={handleScanStop}
  isScanning={isScanning}
/>
```

This component encapsulates all the complex button state logic and event handling, making the parent component cleaner and more focused on its main responsibilities. 