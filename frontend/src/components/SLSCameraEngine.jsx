import React, { useRef, useEffect, useState } from 'react';
import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-backend-webgl';
import { Pose } from '@mediapipe/pose';

class SLSCameraEngine {
  constructor() {
    this.pose = null;
    this.camera = null;
    this.isInitialized = false;
    this.detectionCallback = null;
    this.sensitivity = 0.75;
    this.isDetecting = false;
  }

  async initialize() {
    if (this.isInitialized) return true;

    try {
      // Initialize TensorFlow.js
      await tf.ready();
      await tf.setBackend('webgl');

      // Initialize MediaPipe Pose
      this.pose = new Pose({
        locateFile: (file) => {
          return `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`;
        }
      });

      this.pose.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: true,
        smoothSegmentation: true,
        minDetectionConfidence: this.sensitivity,
        minTrackingConfidence: 0.5
      });

      this.pose.onResults(this.onPoseResults.bind(this));
      this.isInitialized = true;
      return true;
    } catch (error) {
      console.error('Failed to initialize SLS Camera Engine:', error);
      return false;
    }
  }

  onPoseResults(results) {
    if (this.detectionCallback && this.isDetecting) {
      const detections = this.processPoseResults(results);
      this.detectionCallback(detections);
    }
  }

  processPoseResults(results) {
    const detections = [];
    
    if (results.poseLandmarks && results.poseLandmarks.length > 0) {
      const landmarks = results.poseLandmarks;
      
      // Create skeleton structure from pose landmarks
      const skeleton = this.createSkeleton(landmarks);
      
      // Calculate detection confidence
      const confidence = this.calculateConfidence(landmarks);
      
      detections.push({
        id: Date.now(),
        type: 'human_figure',
        confidence: confidence,
        landmarks: landmarks,
        skeleton: skeleton,
        segmentation: results.segmentationMask,
        timestamp: Date.now(),
        worldLandmarks: results.poseWorldLandmarks
      });
    }

    return detections;
  }

  createSkeleton(landmarks) {
    // MediaPipe Pose connections for drawing skeleton
    const connections = [
      // Face
      [0, 1], [1, 2], [2, 3], [3, 7],
      [0, 4], [4, 5], [5, 6], [6, 8],
      // Arms
      [9, 10], [11, 12], [11, 13], [13, 15],
      [12, 14], [14, 16], [11, 23], [12, 24],
      // Body
      [23, 24],
      // Legs
      [23, 25], [25, 27], [27, 29], [29, 31],
      [24, 26], [26, 28], [28, 30], [30, 32],
      [27, 29], [28, 30]
    ];

    return connections.map(([start, end]) => ({
      start: landmarks[start],
      end: landmarks[end],
      confidence: Math.min(landmarks[start]?.visibility || 0, landmarks[end]?.visibility || 0)
    })).filter(connection => 
      connection.start && connection.end && connection.confidence > 0.3
    );
  }

  calculateConfidence(landmarks) {
    const visibleLandmarks = landmarks.filter(landmark => 
      landmark.visibility && landmark.visibility > 0.5
    );
    return visibleLandmarks.length / landmarks.length;
  }

  async startDetection(videoElement, callback) {
    if (!this.isInitialized) {
      const initialized = await this.initialize();
      if (!initialized) return false;
    }

    this.detectionCallback = callback;
    this.isDetecting = true;

    // Create camera instance for MediaPipe
    if (window.Camera) {
      this.camera = new window.Camera(videoElement, {
        onFrame: async () => {
          if (this.isDetecting) {
            await this.pose.send({ image: videoElement });
          }
        },
        width: 640,
        height: 480
      });
    } else {
      // Fallback: manual frame processing
      const processFrame = async () => {
        if (this.isDetecting && videoElement.readyState === 4) {
          await this.pose.send({ image: videoElement });
        }
        requestAnimationFrame(processFrame);
      };
      processFrame();
    }

    return true;
  }

  stopDetection() {
    this.isDetecting = false;
    if (this.camera) {
      this.camera.stop();
      this.camera = null;
    }
  }

  setSensitivity(sensitivity) {
    this.sensitivity = sensitivity;
    if (this.pose) {
      this.pose.setOptions({
        minDetectionConfidence: sensitivity,
        minTrackingConfidence: Math.max(0.3, sensitivity - 0.2)
      });
    }
  }

  // WebXR Depth Sensing (for supported devices)
  async initializeDepthSensing() {
    if ('xr' in navigator && 'supportsSession' in navigator.xr) {
      try {
        const isSupported = await navigator.xr.supportsSession('immersive-ar', {
          requiredFeatures: ['depth-sensing']
        });
        
        if (isSupported) {
          console.log('WebXR Depth Sensing supported');
          return true;
        }
      } catch (error) {
        console.log('WebXR Depth Sensing not available:', error);
      }
    }
    return false;
  }

  async getDepthInformation(frame) {
    try {
      if (frame && frame.getDepthInformation) {
        const depthInfo = frame.getDepthInformation();
        return {
          width: depthInfo.width,
          height: depthInfo.height,
          data: depthInfo.data,
          rawValueToMeters: depthInfo.rawValueToMeters
        };
      }
    } catch (error) {
      console.log('Unable to get depth information:', error);
    }
    return null;
  }
}

// React Hook for using SLS Camera Engine
export const useSLSCamera = () => {
  const [engine] = useState(() => new SLSCameraEngine());
  const [isInitialized, setIsInitialized] = useState(false);
  const [detections, setDetections] = useState([]);
  const [isDetecting, setIsDetecting] = useState(false);

  useEffect(() => {
    return () => {
      engine.stopDetection();
    };
  }, [engine]);

  const initialize = async () => {
    const success = await engine.initialize();
    setIsInitialized(success);
    return success;
  };

  const startDetection = async (videoElement) => {
    const success = await engine.startDetection(videoElement, (newDetections) => {
      setDetections(newDetections);
    });
    setIsDetecting(success);
    return success;
  };

  const stopDetection = () => {
    engine.stopDetection();
    setIsDetecting(false);
    setDetections([]);
  };

  const setSensitivity = (sensitivity) => {
    engine.setSensitivity(sensitivity / 100); // Convert percentage to decimal
  };

  return {
    isInitialized,
    detections,
    isDetecting,
    initialize,
    startDetection,
    stopDetection,
    setSensitivity
  };
};

export default SLSCameraEngine;