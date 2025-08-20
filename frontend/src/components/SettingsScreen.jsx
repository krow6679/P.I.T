import React, { useState } from 'react';
import { Settings, Camera, Volume2, Zap, Shield, Info, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import { Switch } from './ui/switch';
import { Slider } from './ui/slider';

const SettingsScreen = ({ onBack }) => {
  const [settings, setSettings] = useState({
    slsSensitivity: [75],
    spiritBoxVolume: [80],
    radarScanRate: [60],
    enableHaptic: true,
    enableSound: true,
    nightMode: true,
    autoRecord: false,
    dataSharing: true,
    locationServices: true
  });

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const SettingItem = ({ icon: Icon, title, subtitle, children, showChevron = false }) => (
    <Card className="bg-gray-900/50 border-gray-700">
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center flex-1">
            <Icon className="w-6 h-6 text-blue-400 mr-3" />
            <div className="flex-1">
              <h3 className="font-semibold">{title}</h3>
              {subtitle && <p className="text-sm text-gray-400">{subtitle}</p>}
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {children}
            {showChevron && <ChevronRight className="w-5 h-5 text-gray-400" />}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-900/50">
        <Button onClick={onBack} variant="ghost" className="text-white">
          ← Back
        </Button>
        <h1 className="text-lg font-bold">Settings</h1>
        <div></div>
      </div>

      <div className="p-4 space-y-4">
        {/* Detection Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-400 mb-4 flex items-center">
            <Camera className="w-5 h-5 mr-2" />
            Detection Settings
          </h2>
          
          <div className="space-y-4">
            <SettingItem
              icon={Zap}
              title="SLS Sensitivity"
              subtitle={`${settings.slsSensitivity[0]}% - Detection threshold`}
            >
              <div className="w-24">
                <Slider
                  value={settings.slsSensitivity}
                  onValueChange={(value) => updateSetting('slsSensitivity', value)}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>
            </SettingItem>

            <SettingItem
              icon={Volume2}
              title="Spirit Box Volume"
              subtitle={`${settings.spiritBoxVolume[0]}% - Audio output level`}
            >
              <div className="w-24">
                <Slider
                  value={settings.spiritBoxVolume}
                  onValueChange={(value) => updateSetting('spiritBoxVolume', value)}
                  max={100}
                  min={0}
                  step={5}
                />
              </div>
            </SettingItem>

            <SettingItem
              icon={Settings}
              title="Radar Scan Rate"
              subtitle={`${settings.radarScanRate[0]}rpm - Sweep frequency`}
            >
              <div className="w-24">
                <Slider
                  value={settings.radarScanRate}
                  onValueChange={(value) => updateSetting('radarScanRate', value)}
                  max={120}
                  min={30}
                  step={10}
                />
              </div>
            </SettingItem>
          </div>
        </div>

        {/* Interface Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-400 mb-4">Interface</h2>
          
          <div className="space-y-4">
            <SettingItem
              icon={Volume2}
              title="Enable Sound Effects"
              subtitle="Audio feedback for interactions"
            >
              <Switch
                checked={settings.enableSound}
                onCheckedChange={(checked) => updateSetting('enableSound', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={Zap}
              title="Haptic Feedback"
              subtitle="Vibration on device interactions"
            >
              <Switch
                checked={settings.enableHaptic}
                onCheckedChange={(checked) => updateSetting('enableHaptic', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={Settings}
              title="Night Mode"
              subtitle="Dark interface for low-light conditions"
            >
              <Switch
                checked={settings.nightMode}
                onCheckedChange={(checked) => updateSetting('nightMode', checked)}
              />
            </SettingItem>
          </div>
        </div>

        {/* Recording Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-400 mb-4">Recording</h2>
          
          <div className="space-y-4">
            <SettingItem
              icon={Camera}
              title="Auto-Record Sessions"
              subtitle="Automatically record all investigations"
            >
              <Switch
                checked={settings.autoRecord}
                onCheckedChange={(checked) => updateSetting('autoRecord', checked)}
              />
            </SettingItem>
          </div>
        </div>

        {/* Privacy Settings */}
        <div className="mb-6">
          <h2 className="text-lg font-bold text-blue-400 mb-4">Privacy</h2>
          
          <div className="space-y-4">
            <SettingItem
              icon={Shield}
              title="Location Services"
              subtitle="Allow location data for investigations"
            >
              <Switch
                checked={settings.locationServices}
                onCheckedChange={(checked) => updateSetting('locationServices', checked)}
              />
            </SettingItem>

            <SettingItem
              icon={Shield}
              title="Data Sharing"
              subtitle="Share anonymous usage data"
            >
              <Switch
                checked={settings.dataSharing}
                onCheckedChange={(checked) => updateSetting('dataSharing', checked)}
              />
            </SettingItem>
          </div>
        </div>

        {/* About */}
        <div className="mb-20">
          <h2 className="text-lg font-bold text-blue-400 mb-4">About</h2>
          
          <div className="space-y-4">
            <SettingItem
              icon={Info}
              title="Version"
              subtitle="GhostHunter v1.0.0"
              showChevron
            />
            
            <SettingItem
              icon={Info}
              title="Privacy Policy"
              showChevron
            />
            
            <SettingItem
              icon={Info}
              title="Terms of Service"
              showChevron
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;