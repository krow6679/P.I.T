import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./components/SplashScreen";
import HomeScreen from "./components/HomeScreen";
import SLSSpiritBoxScreen from "./components/SLSSpiritBoxScreen";

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
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Ghost Radar</h2>
              <p className="text-gray-400 mb-4">Coming Soon...</p>
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      case 'para-notebook':
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">ParaNotebook</h2>
              <p className="text-gray-400 mb-4">Digital Investigation Records</p>
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Settings</h2>
              <p className="text-gray-400 mb-4">Configure your paranormal tools</p>
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
              >
                Back to Home
              </button>
            </div>
          </div>
        );
      case 'info':
        return (
          <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold mb-4">Hunter Network</h2>
              <p className="text-gray-400 mb-4">Connect with fellow ghost hunters</p>
              <button 
                onClick={handleBack}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 rounded"
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