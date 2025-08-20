import React, { useState, useEffect } from 'react';
import { Radar, Settings, Zap, Thermometer, Activity } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { ghostRadarContacts, environmentalReadings } from '../data/mock';

const GhostRadarScreen = ({ onBack }) => {
  const [contacts, setContacts] = useState([]);
  const [scanning, setScanning] = useState(false);
  const [sweepAngle, setSweepAngle] = useState(0);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    if (scanning) {
      const interval = setInterval(() => {
        setSweepAngle(prev => (prev + 3) % 360);
        
        // Randomly add/remove contacts
        if (Math.random() > 0.8) {
          setContacts(prev => {
            const newContact = {
              ...ghostRadarContacts[Math.floor(Math.random() * ghostRadarContacts.length)],
              id: Date.now(),
              bearing: Math.random() * 360,
              distance: 5 + Math.random() * 25,
              strength: Math.floor(Math.random() * 5) + 1
            };
            return [...prev.slice(-3), newContact]; // Keep only last 4 contacts
          });
        }
      }, 100);

      return () => clearInterval(interval);
    }
  }, [scanning]);

  const RadarBlip = ({ contact, index }) => {
    const angle = (contact.bearing * Math.PI) / 180;
    const radius = (contact.distance / 30) * 120; // Scale to radar size
    const x = 150 + radius * Math.cos(angle - Math.PI / 2);
    const y = 150 + radius * Math.sin(angle - Math.PI / 2);

    return (
      <g
        key={contact.id}
        onClick={() => setSelectedContact(contact)}
        className="cursor-pointer"
        style={{ opacity: Math.max(0.3, 1 - index * 0.2) }}
      >
        <circle
          cx={x}
          cy={y}
          r={contact.strength * 1.5}
          fill="#00ff00"
          className="animate-pulse"
        />
        <circle
          cx={x}
          cy={y}
          r={contact.strength * 3}
          fill="none"
          stroke="#00ff00"
          strokeWidth="1"
          opacity="0.5"
        />
      </g>
    );
  };

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900/50">
        <Button onClick={onBack} variant="ghost" className="text-white">
          ← Back
        </Button>
        <h1 className="text-lg font-bold">Ghost Radar</h1>
        <Button variant="ghost" className="text-white">
          <Settings className="w-5 h-5" />
        </Button>
      </div>

      {/* Radar Display */}
      <div className="flex-1 flex flex-col items-center justify-center p-4">
        <div className="relative w-80 h-80 mb-8">
          <svg
            viewBox="0 0 300 300"
            className="w-full h-full"
            style={{ filter: 'drop-shadow(0 0 20px #00ff0050)' }}
          >
            {/* Radar Grid */}
            <defs>
              <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#00ff0020" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="300" height="300" fill="url(#grid)" />
            
            {/* Radar Circles */}
            <circle cx="150" cy="150" r="30" fill="none" stroke="#00ff0030" strokeWidth="1" />
            <circle cx="150" cy="150" r="60" fill="none" stroke="#00ff0030" strokeWidth="1" />
            <circle cx="150" cy="150" r="90" fill="none" stroke="#00ff0030" strokeWidth="1" />
            <circle cx="150" cy="150" r="120" fill="none" stroke="#00ff0040" strokeWidth="2" />
            
            {/* Radar Cross */}
            <line x1="150" y1="30" x2="150" y2="270" stroke="#00ff0030" strokeWidth="1" />
            <line x1="30" y1="150" x2="270" y2="150" stroke="#00ff0030" strokeWidth="1" />
            
            {/* Center Dot */}
            <circle cx="150" cy="150" r="3" fill="#00ff00" />
            
            {/* Sweep Line */}
            {scanning && (
              <line
                x1="150"
                y1="150"
                x2={150 + 120 * Math.cos((sweepAngle * Math.PI) / 180 - Math.PI / 2)}
                y2={150 + 120 * Math.sin((sweepAngle * Math.PI) / 180 - Math.PI / 2)}
                stroke="#00ff00"
                strokeWidth="2"
                opacity="0.8"
              />
            )}
            
            {/* Sweep Arc */}
            {scanning && (
              <path
                d={`M 150 150 L 150 30 A 120 120 0 0 1 ${150 + 120 * Math.cos((sweepAngle * Math.PI) / 180 - Math.PI / 2)} ${150 + 120 * Math.sin((sweepAngle * Math.PI) / 180 - Math.PI / 2)} Z`}
                fill="url(#sweepGradient)"
                opacity="0.3"
              />
            )}
            
            <defs>
              <linearGradient id="sweepGradient">
                <stop offset="0%" stopColor="#00ff00" stopOpacity="0" />
                <stop offset="100%" stopColor="#00ff00" stopOpacity="0.5" />
              </linearGradient>
            </defs>
            
            {/* Contact Blips */}
            {contacts.map((contact, index) => (
              <RadarBlip key={contact.id} contact={contact} index={index} />
            ))}
          </svg>
        </div>

        {/* Scan Control */}
        <Button
          onClick={() => setScanning(!scanning)}
          className={`mb-4 px-8 py-3 ${scanning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
        >
          <Radar className="w-5 h-5 mr-2" />
          {scanning ? 'Stop Scan' : 'Start Scan'}
        </Button>
      </div>

      {/* Contact Info */}
      {selectedContact && (
        <Card className="mx-4 mb-4 bg-gray-900/90 border-green-500/30">
          <CardContent className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-bold text-green-400">{selectedContact.name}</h3>
                <p className="text-sm text-gray-400 mb-2">Type: {selectedContact.type}</p>
                <div className="space-y-1">
                  <div className="text-sm">Distance: {selectedContact.distance.toFixed(1)}m</div>
                  <div className="text-sm">Bearing: {selectedContact.bearing.toFixed(0)}°</div>
                  <div className="text-sm">Strength: {Array(selectedContact.strength).fill('●').join('')}</div>
                </div>
              </div>
              <Button
                onClick={() => setSelectedContact(null)}
                variant="ghost"
                className="text-gray-400 p-1"
              >
                ×
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Environmental Readings */}
      <Card className="mx-4 mb-20 bg-gray-900/90 border-gray-700">
        <CardContent className="p-4">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <Thermometer className="w-6 h-6 text-blue-400 mx-auto mb-1" />
              <div className="text-sm text-blue-400">{environmentalReadings.temperature}°F</div>
            </div>
            <div>
              <Activity className="w-6 h-6 text-yellow-400 mx-auto mb-1" />
              <div className="text-sm text-yellow-400">{environmentalReadings.emf} EMF</div>
            </div>
            <div>
              <Zap className="w-6 h-6 text-purple-400 mx-auto mb-1" />
              <div className="text-sm text-purple-400">{contacts.length} Contacts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GhostRadarScreen;