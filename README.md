# GhostHunter - Professional Paranormal Investigation Suite

A mobile-native web application that replicates SLS Camera functionality with integrated Spirit Box and additional paranormal investigation tools.

## Features

### 🔍 SLS Camera with Real AR Detection
- **Real-time human pose detection** using MediaPipe BlazePose
- **Structured Light Sensor simulation** with actual skeleton mapping
- **WebXR depth sensing** support for compatible devices
- **Adjustable sensitivity** controls
- **Recording capabilities** for evidence capture

### 👻 Spirit Box Integration
- **Concurrent operation** with SLS camera
- **Diverse word bank** of spooky, scary, and common words
- **Spooky text effects** with fade in/out animations
- **Jagged text styling** for authentic paranormal feel

### 📡 Ghost Radar
- **Real-time radar display** with sweep animation
- **Sensor-based detection** using device capabilities
- **Contact identification** and detailed information
- **Environmental readings** (temperature, EMF, etc.)

### 📝 ParaNotebook
- **Digital investigation records** with comprehensive logging
- **Evidence tracking** with categorized badges
- **Team member logging** and location data
- **Weather condition tracking**

### ⚙️ Settings & Configuration
- **Sensitivity controls** for all detection tools
- **Interface customization** options
- **Privacy controls** and data management
- **Audio/haptic feedback** settings

### 🌐 Hunter Network
- **Social platform** for paranormal investigators
- **Evidence sharing** capabilities
- **Location database** of haunted sites
- **Team formation** tools

## Technology Stack

### Frontend
- **React 19** - Modern UI framework
- **TailwindCSS** - Utility-first styling
- **Shadcn/UI** - Premium UI components
- **MediaPipe** - Real-time pose detection
- **TensorFlow.js** - Machine learning inference
- **WebXR** - Augmented reality capabilities

### Detection Engines
- **MediaPipe BlazePose** - Human pose detection
- **WebGL acceleration** - High-performance rendering
- **Canvas API** - Real-time overlay rendering
- **WebRTC** - Camera access and streaming

## Mobile Deployment

### For React Native Conversion
```bash
# Install React Native CLI
npm install -g @react-native-community/cli

# Create new React Native project
npx react-native init GhostHunterMobile

# Copy components and adapt for React Native
# Replace web-specific APIs with React Native equivalents
```

### For Progressive Web App (PWA)
```bash
# Add PWA manifest and service worker
# Enable installable web app on mobile devices
# Configure offline capabilities
```

### For Cordova/PhoneGap
```bash
# Install Cordova
npm install -g cordova

# Create Cordova project
cordova create GhostHunterMobile com.ghosthunter.app GhostHunter

# Add mobile platforms
cordova platform add ios android

# Add required plugins
cordova plugin add cordova-plugin-camera
cordova plugin add cordova-plugin-device-motion
cordova plugin add cordova-plugin-geolocation
cordova plugin add cordova-plugin-vibration
```

## Required Mobile Permissions

### iOS (Info.plist)
```xml
<key>NSCameraUsageDescription</key>
<string>GhostHunter requires camera access for SLS detection</string>
<key>NSMicrophoneUsageDescription</key>
<string>GhostHunter requires microphone access for EVP recording</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>GhostHunter requires location access for investigation logging</string>
<key>NSMotionUsageDescription</key>
<string>GhostHunter requires motion sensors for paranormal detection</string>
```

### Android (AndroidManifest.xml)
```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
<uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />

<uses-feature android:name="android.hardware.camera" android:required="true" />
<uses-feature android:name="android.hardware.camera.front" android:required="false" />
```

## Development Setup

### Prerequisites
- Node.js 18+
- Yarn package manager
- Modern browser with WebGL support
- HTTPS enabled (required for camera access)

### Installation
```bash
# Clone the repository
git clone <repository-url>
cd ghosthunter

# Install dependencies
cd frontend
yarn install

# Start development server
yarn start
```

### Building for Production
```bash
# Build optimized production bundle
yarn build

# Serve production build
npx serve -s build
```

## Key Components

### SLS Camera Engine (`/src/components/SLSCameraEngine.jsx`)
- **Real pose detection** using MediaPipe
- **WebXR integration** for depth sensing
- **Skeleton rendering** with confidence scoring
- **Performance optimizations** for mobile devices

### Camera Integration
- **WebRTC camera access** with environment facing preference
- **Real-time video processing** at 30fps
- **Canvas overlay rendering** for detections
- **Automatic camera permissions** handling

### Spirit Box Engine
- **Word randomization** with timing variations
- **Text animation effects** with CSS transitions
- **Concurrent operation** with SLS detection
- **Customizable word banks**

## Performance Optimizations

### Mobile-Specific
- **WebGL backend** for TensorFlow.js
- **Reduced model complexity** for real-time performance
- **Frame rate optimization** (30fps target)
- **Memory management** for long sessions
- **Battery usage optimization**

### Detection Accuracy
- **Confidence thresholding** to reduce false positives
- **Temporal smoothing** for stable detections
- **Multi-frame validation** for reliability
- **Adaptive sensitivity** based on lighting conditions

## Troubleshooting

### Common Issues
1. **Camera not working**: Ensure HTTPS and permissions granted
2. **Poor detection**: Adjust lighting and sensitivity settings
3. **Performance issues**: Lower model complexity in settings
4. **App crashes**: Check browser compatibility and memory usage

### Browser Compatibility
- **Chrome 90+** (recommended)
- **Safari 14+** (iOS/macOS)
- **Firefox 88+**
- **Edge 90+**

## Future Enhancements

### Planned Features
- **LiDAR integration** for iPhone/iPad Pro
- **ARCore support** for Android devices
- **Cloud sync** for investigation records
- **Machine learning** improvements for detection accuracy
- **Multiplayer investigations** with real-time sharing

### Hardware Integration
- **External EMF sensors** via Bluetooth
- **Temperature sensors** integration
- **Motion detectors** connectivity
- **Audio analysis** for EVP detection

## Deployment Checklist

### Pre-Deployment
- [ ] Test on target devices
- [ ] Verify camera permissions
- [ ] Test in various lighting conditions
- [ ] Validate performance metrics
- [ ] Check offline functionality

### App Store Submission
- [ ] Prepare app screenshots
- [ ] Write app store descriptions
- [ ] Set up app store accounts
- [ ] Configure app metadata
- [ ] Submit for review

## License
This project is licensed under the MIT License - see the LICENSE file for details.

## Support
For technical support or feature requests, please open an issue in the repository.

---

**Note**: This application is designed for entertainment and investigative purposes. Results should be interpreted with appropriate skepticism and scientific methodology.
