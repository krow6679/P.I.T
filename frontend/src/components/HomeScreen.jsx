import React from 'react';
import { Camera, Radar, BookOpen, Settings, Info, Zap, Ghost } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';

const HomeScreen = ({ onNavigate }) => {
  const tools = [
    {
      id: 'sls-spiritbox',
      title: 'SLS + Spirit Box',
      subtitle: 'Main Investigation Tool',
      icon: Camera,
      color: 'from-green-600 to-green-400',
      description: 'Advanced SLS camera with integrated spirit box communication',
      isPrimary: true
    },
    {
      id: 'ghost-radar',
      title: 'Ghost Radar',
      subtitle: 'Entity Detection',
      icon: Radar,
      color: 'from-purple-600 to-purple-400',
      description: 'Real-time paranormal entity detection using device sensors'
    },
    {
      id: 'para-notebook',
      title: 'ParaNotebook',
      subtitle: 'Investigation Records',
      icon: BookOpen,
      color: 'from-blue-600 to-blue-400',
      description: 'Digital logbook for documenting paranormal investigations'
    }
  ];

  const otherOptions = [
    {
      id: 'settings',
      title: 'Settings',
      icon: Settings,
      color: 'text-gray-400'
    },
    {
      id: 'info',
      title: 'Hunter Network',
      icon: Info,
      color: 'text-gray-400'
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white p-4">
      {/* Header */}
      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center mb-4">
          <Ghost className="w-8 h-8 text-green-500 mr-2" />
          <Zap className="w-6 h-6 text-purple-500" />
        </div>
        <h1 className="text-2xl font-bold mb-2">GHOSTHUNTER</h1>
        <p className="text-gray-400 text-sm">Select your investigation tool</p>
      </div>

      {/* Primary Tool */}
      <div className="mb-8">
        <Card className="bg-gradient-to-br from-gray-900 to-gray-800 border-green-500/30 overflow-hidden">
          <CardContent className="p-0">
            <Button
              onClick={() => onNavigate('sls-spiritbox')}
              className={`w-full h-32 bg-gradient-to-r ${tools[0].color} hover:scale-[1.02] transition-all duration-300 text-white`}
              variant="ghost"
            >
              <div className="flex flex-col items-center space-y-2">
                <Camera className="w-12 h-12" />
                <div className="text-center">
                  <h3 className="font-bold text-lg">{tools[0].title}</h3>
                  <p className="text-sm opacity-90">{tools[0].subtitle}</p>
                </div>
              </div>
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Secondary Tools */}
      <div className="grid grid-cols-1 gap-4 mb-8">
        {tools.slice(1).map((tool) => {
          const IconComponent = tool.icon;
          return (
            <Card key={tool.id} className="bg-gray-900/50 border-gray-700/50 hover:border-gray-600/50 transition-colors">
              <CardContent className="p-4">
                <Button
                  onClick={() => onNavigate(tool.id)}
                  className="w-full justify-start p-0 h-auto bg-transparent hover:bg-gray-800/50 text-left"
                  variant="ghost"
                >
                  <div className="flex items-center space-x-4 w-full">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${tool.color}`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{tool.title}</h3>
                      <p className="text-sm text-gray-400">{tool.subtitle}</p>
                    </div>
                  </div>
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-900/95 backdrop-blur-sm border-t border-gray-700/50">
        <div className="flex justify-center space-x-8 py-4">
          {otherOptions.map((option) => {
            const IconComponent = option.icon;
            return (
              <Button
                key={option.id}
                onClick={() => onNavigate(option.id)}
                className="flex flex-col items-center space-y-1 bg-transparent hover:bg-gray-800/50 p-3"
                variant="ghost"
              >
                <IconComponent className={`w-6 h-6 ${option.color}`} />
                <span className="text-xs text-gray-400">{option.title}</span>
              </Button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;