import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import SLSSpiritBoxScreen from "./components/SLSSpiritBoxScreen";
import GhostRadarScreen from "./components/GhostRadarScreen";
import ParaNotebookScreen from "./components/ParaNotebookScreen";
import SettingsScreen from "./components/SettingsScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [currentScreen, setCurrentScreen] = useState('home');

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleNavigate = (screen) => {
    setCurrentScreen(screen);
  };

  const handleBack = () => {
    setCurrentScreen('home');
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return <HomeScreen onNavigate={handleNavigate} />;
      case 'sls-spiritbox':
        return <SLSSpiritBoxScreen onBack={handleBack} />;
      case 'ghost-radar':
        return <GhostRadarScreen onBack={handleBack} />;
      case 'para-notebook':
        return <ParaNotebookScreen onBack={handleBack} />;
      case 'settings':
        return <SettingsScreen onBack={handleBack} />;
      case 'info':
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center p-6">
              <h2 className="text-2xl font-bold mb-4">Hunter Network</h2>
              <p className="text-gray-400 mb-6">Connect with fellow ghost hunters worldwide</p>
              <div className="space-y-4 mb-8">
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-green-400 mb-2">Share Experiences</h3>
                  <p className="text-sm text-gray-300">Upload your investigations and evidence to the community</p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-purple-400 mb-2">Find Teams</h3>
                  <p className="text-sm text-gray-300">Connect with investigators in your area</p>
                </div>
                <div className="p-4 bg-gray-900 rounded-lg border border-gray-700">
                  <h3 className="font-bold text-blue-400 mb-2">Location Database</h3>
                  <p className="text-sm text-gray-300">Discover haunted locations and hotspots</p>
                </div>
              </div>
              <button 
                onClick={handleBack}
                className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-lg transition-colors"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      default:
        return <HomeScreen onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={renderScreen()}>
            <Route index element={renderScreen()} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;