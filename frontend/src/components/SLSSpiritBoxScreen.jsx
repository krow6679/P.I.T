import React, { useState, useEffect, useRef } from 'react';
import { Camera, Square, Circle, Settings, Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Slider } from './ui/slider';
import { spiritBoxWords, environmentalReadings } from '../data/mock';
import { useSLSCamera } from './SLSCameraEngine';

const SLSSpiritBoxScreen = ({ onBack }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [slsActive, setSLSActive] = useState(false);
  const [spiritBoxActive, setSpiritBoxActive] = useState(false);
  const [sensitivity, setSensitivity] = useState([75]);
  const [currentWord, setCurrentWord] = useState('');
  const [wordOpacity, setWordOpacity] = useState(0);
  const [audioEnabled, setAudioEnabled] = useState(true);
  const [cameraReady, setCameraReady] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Use the SLS Camera Engine
  const {
    isInitialized,
    detections,
    isDetecting,
    initialize,
    startDetection,
    stopDetection,
    setSensitivity: setSLSSensitivity
  } = useSLSCamera();

  // Spirit Box burst logic
  useEffect(() => {
    if (!spiritBoxActive) return;

    let burstTimeout, wordTimeout;
    let burstWords = 0;

    const startBurst = () => {
      const wordsThisBurst = Math.floor(Math.random() * 3) + 3; // 3, 4, or 5
      burstWords = 0;

      const showWord = () => {
        const randomWord = spiritBoxWords[Math.floor(Math.random() * spiritBoxWords.length)];
        setCurrentWord(randomWord);
        setWordOpacity(1);

        setTimeout(() => setWordOpacity(0), 2000); // Fade out after 2s

        burstWords++;
        if (burstWords < wordsThisBurst) {
          // Next word in 1–2s
          wordTimeout = setTimeout(showWord, 1000 + Math.random() * 1000);
        } else {
          // Schedule the next burst in 60–85s
          burstTimeout = setTimeout(startBurst, 60000 + Math.random() * 25000);
        }
      };

      showWord();
    };

    startBurst();

    return () => {
      clearTimeout(burstTimeout);
      clearTimeout(wordTimeout);
    };
  }, [spiritBoxActive]);

  // Initialize camera and SLS engine
  useEffect(() => {
    const initCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { 
            facingMode: 'environment',
            width: { ideal: 640 },
            height: { ideal: 480 }
          } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          videoRef.current.onloadedmetadata = () => {
            setCameraReady(true);
          };
        }

        // Initialize SLS engine
        await initialize();
      } catch (error) {
        console.error('Camera access denied:', error);
      }
    };

    initCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const tracks = videoRef.current.srcObject.getTracks();
        tracks.forEach(track => track.stop());
      }
    };
  }, [initialize]);

  // Handle SLS detection toggle
  useEffect(() => {
    if (!cameraReady || !videoRef.current) return;

    if (slsActive && isInitialized) {
      startDetection(videoRef.current);
    } else {
      stopDetection();
    }
  }, [slsActive, cameraReady, isInitialized, startDetection, stopDetection]);

  // Update SLS sensitivity
  useEffect(() => {
    setSLSSensitivity(sensitivity[0]);
  }, [sensitivity, setSLSSensitivity]);

  const drawSLSOverlay = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    if (slsActive && detections.length > 0) {
      detections.forEach(detection => {
        if (detection.skeleton && detection.skeleton.length > 0) {
          // Draw skeleton connections
          ctx.strokeStyle = '#00ff00';
          ctx.lineWidth = 2;
          ctx.globalAlpha = detection.confidence;

          detection.skeleton.forEach(connection => {
            if (connection.start && connection.end && connection.confidence > 0.3) {
              const startX = connection.start.x * canvas.width;
              const startY = connection.start.y * canvas.height;
              const endX = connection.end.x * canvas.width;
              const endY = connection.end.y * canvas.height;

              ctx.beginPath();
              ctx.moveTo(startX, startY);
              ctx.lineTo(endX, endY);
              ctx.stroke();
            }
          });

          // Draw landmark points
          if (detection.landmarks) {
            ctx.fillStyle = '#00ff00';
            detection.landmarks.forEach(landmark => {
              if (landmark.visibility > 0.5) {
                const x = landmark.x * canvas.width;
                const y = landmark.y * canvas.height;
                ctx.beginPath();
                ctx.arc(x, y, 3, 0, 2 * Math.PI);
                ctx.fill();
              }
            });
          }
        }
        
        ctx.globalAlpha = 1;
      });
    }
  };

  useEffect(() => {
    const interval = setInterval(drawSLSOverlay, 100);
    return () => clearInterval(interval);
  }, [detections, slsActive]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900/50">
        <Button onClick={onBack} variant="ghost" className="text-white">
          ← Back
        </Button>
        <h1 className="text-lg font-bold">SLS + Spirit Box</h1>
        <Button variant="ghost" className="text-white">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Camera View */}
      <div className="flex-1 relative bg-gray-900">
        <div className="relative w-full h-96 bg-black overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
            style={{ transform: 'scaleX(-1)' }} // Mirror camera
          />
          
          {/* SLS Overlay Canvas */}
          <canvas
            ref={canvasRef}
            width={360}
            height={240}
            className="absolute inset-0 w-full h-full"
            style={{ transform: 'scaleX(-1)' }}
          />

          {/* SLS Status */}
          {slsActive && (
            <div className="absolute top-4 left-4 bg-green-500/20 border border-green-500 rounded px-2 py-1">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-xs text-green-400">SLS ACTIVE</span>
              </div>
            </div>
          )}

          {/* Detection Count */}
          <div className="absolute top-4 right-4 bg-black/60 rounded px-2 py-1">
            <span className="text-xs text-green-400">
              Contacts: {detections.length}
            </span>
          </div>

          {/* Environmental Readings */}
          <div className="absolute bottom-4 left-4 bg-black/60 rounded p-2">
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="text-blue-400">TEMP: {environmentalReadings.temperature}°F</div>
              <div className="text-yellow-400">EMF: {environmentalReadings.emf}</div>
            </div>
          </div>
        </div>

        {/* Spirit Box Display */}
        <div className="absolute bottom-20 right-4 w-48 h-16 bg-black/80 border border-green-500/30 rounded flex items-center justify-center">
          {spiritBoxActive && (
            <div 
              className="text-center transition-opacity duration-500"
              style={{ opacity: wordOpacity }}
            >
              <div 
                className="text-green-400 font-mono text-lg font-bold tracking-wider"
                style={{ 
                  fontFamily: 'monospace',
                  textShadow: '0 0 10px #00ff00',
                  filter: 'drop-shadow(0 0 5px #00ff00)',
                  transform: `rotate(${Math.random() * 4 - 2}deg)` // Slight random rotation for jagged effect
                }}
              >
                {currentWord.toUpperCase()}
              </div>
            </div>
          )}
          
          {!spiritBoxActive && (
            <div className="text-gray-500 text-xs">Spirit Box Inactive</div>
          )}
        </div>
      </div>

      {/* Control Panel */}
      <Card className="m-4 bg-gray-900/90 border-gray-700">
        <CardContent className="p-4 space-y-4">
          {/* Recording and Tool Toggles */}
          <div className="flex items-center justify-between">
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsRecording(!isRecording)}
                className={`px-4 py-2 ${isRecording ? 'bg-red-600 hover:bg-red-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {isRecording ? <Square className="w-4 h-4" /> : <Circle className="w-4 h-4" />}
                {isRecording ? 'Stop' : 'Record'}
              </Button>
              
              <Button
                onClick={() => setSLSActive(!slsActive)}
                className={`${slsActive ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                <Camera className="w-4 h-4 mr-1" />
                SLS
              </Button>
              
              <Button
                onClick={() => setSpiritBoxActive(!spiritBoxActive)}
                className={`${spiritBoxActive ? 'bg-purple-600 hover:bg-purple-700' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                {spiritBoxActive ? <Volume2 className="w-4 h-4 mr-1" /> : <VolumeX className="w-4 h-4 mr-1" />}
                Spirit Box
              </Button>
            </div>

            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="ghost"
              className="text-gray-400"
            >
              {audioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </Button>
          </div>

          {/* Sensitivity Slider */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm text-gray-400">SLS Sensitivity</label>
              <span className="text-sm text-green-400">{sensitivity[0]}%</span>
            </div>
            <Slider
              value={sensitivity}
              onValueChange={setSensitivity}
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SLSSpiritBoxScreen;
