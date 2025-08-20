#!/bin/bash

# GhostHunter Mobile Deployment Script
# This script helps prepare the application for mobile compilation

echo "🔮 GhostHunter Mobile Deployment Setup 🔮"
echo "=========================================="

# Function to check if command exists
command_exists() {
    command -v "$1" >/dev/null 2>&1
}

# Create mobile deployment directory
echo "📁 Creating mobile deployment directory..."
mkdir -p /app/mobile-build
cd /app/mobile-build

# Copy frontend source
echo "📋 Copying frontend source files..."
cp -r /app/frontend/* .

# Create mobile-specific package.json
echo "📦 Creating mobile-optimized package.json..."
cat > package.json << 'EOF'
{
  "name": "ghosthunter-mobile",
  "version": "1.0.0",
  "private": true,
  "homepage": "./",
  "dependencies": {
    "@hookform/resolvers": "^5.0.1",
    "@radix-ui/react-accordion": "^1.2.8",
    "@radix-ui/react-alert-dialog": "^1.1.11",
    "@radix-ui/react-aspect-ratio": "^1.1.4",
    "@radix-ui/react-avatar": "^1.1.7",
    "@radix-ui/react-checkbox": "^1.2.3",
    "@radix-ui/react-collapsible": "^1.1.8",
    "@radix-ui/react-context-menu": "^2.2.12",
    "@radix-ui/react-dialog": "^1.1.11",
    "@radix-ui/react-dropdown-menu": "^2.1.12",
    "@radix-ui/react-hover-card": "^1.1.11",
    "@radix-ui/react-label": "^2.1.4",
    "@radix-ui/react-menubar": "^1.1.12",
    "@radix-ui/react-navigation-menu": "^1.2.10",
    "@radix-ui/react-popover": "^1.1.11",
    "@radix-ui/react-progress": "^1.1.4",
    "@radix-ui/react-radio-group": "^1.3.4",
    "@radix-ui/react-scroll-area": "^1.2.6",
    "@radix-ui/react-select": "^2.2.2",
    "@radix-ui/react-separator": "^1.1.4",
    "@radix-ui/react-slider": "^1.3.2",
    "@radix-ui/react-slot": "^1.2.0",
    "@radix-ui/react-switch": "^1.2.2",
    "@radix-ui/react-tabs": "^1.1.9",
    "@radix-ui/react-toast": "^1.2.11",
    "@radix-ui/react-toggle": "^1.1.6",
    "@radix-ui/react-toggle-group": "^1.1.7",
    "@radix-ui/react-tooltip": "^1.2.4",
    "axios": "^1.8.4",
    "class-variance-authority": "^0.7.1",
    "clsx": "^2.1.1",
    "cmdk": "^1.1.1",
    "cra-template": "1.2.0",
    "date-fns": "^4.1.0",
    "embla-carousel-react": "^8.6.0",
    "input-otp": "^1.4.2",
    "lucide-react": "^0.507.0",
    "next-themes": "^0.4.6",
    "react": "^19.0.0",
    "react-day-picker": "8.10.1",
    "react-dom": "^19.0.0",
    "react-hook-form": "^7.56.2",
    "react-resizable-panels": "^3.0.1",
    "react-router-dom": "^7.5.1",
    "react-scripts": "5.0.1",
    "sonner": "^2.0.3",
    "tailwind-merge": "^3.2.0",
    "tailwindcss-animate": "^1.0.7",
    "vaul": "^1.1.2",
    "zod": "^3.24.4",
    "@tensorflow/tfjs": "^4.22.0",
    "@tensorflow/tfjs-backend-webgl": "^4.22.0"
  },
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "build-mobile": "GENERATE_SOURCEMAP=false npm run build",
    "test": "craco test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@craco/craco": "^7.1.0",
    "@eslint/js": "9.23.0",
    "autoprefixer": "^10.4.20",
    "eslint": "9.23.0",
    "eslint-plugin-import": "2.31.0",
    "eslint-plugin-jsx-a11y": "6.10.2",
    "eslint-plugin-react": "7.37.4",
    "globals": "15.15.0",
    "postcss": "^8.4.49",
    "tailwindcss": "^3.4.17"
  }
}
EOF

# Build the project
echo "🔨 Building optimized production bundle..."
yarn install
GENERATE_SOURCEMAP=false yarn build

# Check build success
if [ $? -eq 0 ]; then
    echo "✅ Build completed successfully!"
    
    # Create Cordova project structure
    if command_exists cordova; then
        echo "📱 Setting up Cordova project..."
        cd /app/mobile-build
        cordova create GhostHunterCordova com.ghosthunter.app GhostHunter
        
        # Copy built files to Cordova www
        cp -r build/* GhostHunterCordova/www/
        
        cd GhostHunterCordova
        
        # Add platforms
        cordova platform add android
        cordova platform add ios
        
        # Add essential plugins
        cordova plugin add cordova-plugin-camera
        cordova plugin add cordova-plugin-device
        cordova plugin add cordova-plugin-device-motion
        cordova plugin add cordova-plugin-geolocation
        cordova plugin add cordova-plugin-media
        cordova plugin add cordova-plugin-media-capture
        cordova plugin add cordova-plugin-vibration
        cordova plugin add cordova-plugin-statusbar
        cordova plugin add cordova-plugin-splashscreen
        cordova plugin add cordova-plugin-whitelist
        cordova plugin add cordova-plugin-file
        
        # Create config.xml for mobile features
        cat > config.xml << 'EOL'
<?xml version='1.0' encoding='utf-8'?>
<widget id="com.ghosthunter.app" version="1.0.0" xmlns="http://www.w3.org/ns/widgets" xmlns:cdv="http://cordova.apache.org/ns/1.0">
    <name>GhostHunter</name>
    <description>Professional Paranormal Investigation Suite</description>
    <author email="support@ghosthunter.app" href="http://ghosthunter.app">
        GhostHunter Team
    </author>
    <content src="index.html" />
    <access origin="*" />
    <allow-intent href="http://*/*" />
    <allow-intent href="https://*/*" />
    <allow-intent href="tel:*" />
    <allow-intent href="sms:*" />
    <allow-intent href="mailto:*" />
    <allow-intent href="geo:*" />
    
    <!-- Platform-specific configurations -->
    <platform name="android">
        <allow-intent href="market:*" />
        <preference name="Orientation" value="portrait" />
        <preference name="FullScreen" value="false" />
        <preference name="StatusBarOverlaysWebView" value="false" />
        <preference name="StatusBarBackgroundColor" value="#000000" />
        <preference name="StatusBarStyle" value="lightcontent" />
        
        <!-- Permissions -->
        <uses-permission android:name="android.permission.CAMERA" />
        <uses-permission android:name="android.permission.RECORD_AUDIO" />
        <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
        <uses-permission android:name="android.permission.ACCESS_COARSE_LOCATION" />
        <uses-permission android:name="android.permission.VIBRATE" />
        <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
        <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
        
        <!-- Hardware features -->
        <uses-feature android:name="android.hardware.camera" android:required="true" />
        <uses-feature android:name="android.hardware.camera.front" android:required="false" />
        <uses-feature android:name="android.hardware.location" android:required="false" />
        <uses-feature android:name="android.hardware.location.gps" android:required="false" />
    </platform>
    
    <platform name="ios">
        <allow-intent href="itms:*" />
        <allow-intent href="itms-apps:*" />
        <preference name="Orientation" value="portrait" />
        <preference name="StatusBarOverlaysWebView" value="false" />
        <preference name="StatusBarBackgroundColor" value="#000000" />
        <preference name="StatusBarStyle" value="lightcontent" />
        
        <!-- iOS Privacy Descriptions -->
        <edit-config target="NSCameraUsageDescription" file="*-Info.plist" mode="merge">
            <string>GhostHunter requires camera access for SLS paranormal detection</string>
        </edit-config>
        <edit-config target="NSMicrophoneUsageDescription" file="*-Info.plist" mode="merge">
            <string>GhostHunter requires microphone access for EVP recording</string>
        </edit-config>
        <edit-config target="NSLocationWhenInUseUsageDescription" file="*-Info.plist" mode="merge">
            <string>GhostHunter requires location access for investigation logging</string>
        </edit-config>
        <edit-config target="NSMotionUsageDescription" file="*-Info.plist" mode="merge">
            <string>GhostHunter requires motion sensors for paranormal detection</string>
        </edit-config>
    </platform>
    
    <!-- Security and Content Security Policy -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' data: gap: https://ssl.gstatic.com https://cdn.jsdelivr.net 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; media-src *; img-src 'self' data: content:;">
    
    <!-- Plugin configurations -->
    <preference name="DisallowOverscroll" value="true" />
    <preference name="android-minSdkVersion" value="24" />
    <preference name="android-targetSdkVersion" value="33" />
    <preference name="BackupWebStorage" value="none" />
    <preference name="SplashMaintainAspectRatio" value="true" />
    <preference name="FadeSplashScreenDuration" value="300" />
    <preference name="SplashShowOnlyFirstTime" value="false" />
    <preference name="SplashScreen" value="screen" />
    <preference name="SplashScreenDelay" value="3000" />
</widget>
EOL

        echo "✅ Cordova project created successfully!"
        echo "📱 To build for Android: cd GhostHunterCordova && cordova build android"
        echo "📱 To build for iOS: cd GhostHunterCordova && cordova build ios"
        
    else
        echo "⚠️  Cordova not found. Install with: npm install -g cordova"
    fi
    
    # Create React Native expo setup instructions
    echo "📄 Creating React Native setup instructions..."
    cat > ../REACT_NATIVE_SETUP.md << 'EOF'
# React Native Conversion Guide

## Prerequisites
```bash
npm install -g @react-native-community/cli
npm install -g @expo/cli
```

## Option 1: Expo (Recommended for beginners)
```bash
npx create-expo-app GhostHunterMobile --template
cd GhostHunterMobile

# Install required dependencies
npx expo install expo-camera
npx expo install expo-media-library
npx expo install expo-av
npx expo install expo-location
npx expo install expo-sensors
npx expo install expo-gl
npx expo install expo-gl-cpp
```

## Option 2: React Native CLI (More control)
```bash
npx react-native init GhostHunterMobile
cd GhostHunterMobile

# Install dependencies
npm install react-native-camera
npm install @react-native-async-storage/async-storage
npm install react-native-sensors
npm install react-native-geolocation-service
npm install react-native-sound
```

## Key Components to Adapt

### Camera Component
- Replace `navigator.mediaDevices.getUserMedia` with `expo-camera` or `react-native-camera`
- Adapt canvas rendering to `react-native-svg` or `expo-gl`

### MediaPipe Integration
- Use `react-native-mediapipe` if available
- Otherwise, implement server-side processing with API calls

### Storage
- Replace localStorage with `@react-native-async-storage/async-storage`
- Use `expo-file-system` for file operations

### Sensors
- Replace web sensor APIs with `expo-sensors`
- Implement gyroscope, accelerometer, and magnetometer readings

## Build Commands
```bash
# For Expo
npx expo build:android
npx expo build:ios

# For React Native CLI
npx react-native run-android
npx react-native run-ios
```
EOF

    echo "✅ All deployment files created!"
    echo ""
    echo "📋 Next Steps:"
    echo "1. For Cordova: cd /app/mobile-build/GhostHunterCordova"
    echo "2. For React Native: Follow /app/mobile-build/REACT_NATIVE_SETUP.md"
    echo "3. For PWA: Serve the build/ directory with HTTPS"
    echo ""
    echo "📁 Files created in: /app/mobile-build/"
    echo "🔮 Happy ghost hunting! 👻"
    
else
    echo "❌ Build failed. Please check the error messages above."
    exit 1
fi