import React from 'react';
import { Play, Pause, Square, RotateCcw, MessageCircle, Music, Sliders, BarChart3, BookOpen } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: 'tracks' | 'piano' | 'mixer' | 'analyzer' | 'manual') => void;
  showChat: boolean;
  setShowChat: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ 
  currentView, 
  setCurrentView, 
  showChat, 
  setShowChat 
}) => {
  const { project, audioEngine } = useProject();
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    if (isPlaying) {
      audioEngine.pause();
    } else {
      audioEngine.start();
    }
    setIsPlaying(!isPlaying);
  };

  const handleStop = () => {
    audioEngine.stop();
    setIsPlaying(false);
  };

  const viewButtons = [
    { id: 'tracks', label: 'Tracks', icon: Music },
    { id: 'piano', label: 'Piano Roll', icon: Music },
    { id: 'mixer', label: 'Mixer', icon: Sliders },
    { id: 'analyzer', label: 'Analyzer', icon: BarChart3 },
    { id: 'manual', label: 'Manual', icon: BookOpen }
  ];

  return (
    <header className="bg-daw-dark border-b border-gray-700 p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <h1 className="text-xl font-bold text-daw-accent">AI DAW Studio</h1>
          <div className="text-sm text-gray-400">
            {project.name} • {project.bpm} BPM • {project.key} • {project.timeSignature}
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={handlePlay}
            className="p-2 bg-daw-accent hover:bg-blue-600 rounded-lg transition-colors"
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} />}
          </button>
          <button
            onClick={handleStop}
            className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
          >
            <Square size={20} />
          </button>
          <button
            onClick={() => audioEngine.stop()}
            className="p-2 bg-gray-600 hover:bg-gray-500 rounded-lg transition-colors"
          >
            <RotateCcw size={20} />
          </button>
        </div>

        <div className="flex items-center space-x-2">
          {viewButtons.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setCurrentView(id as any)}
              className={`px-3 py-2 rounded-lg transition-colors flex items-center space-x-1 ${
                currentView === id 
                  ? 'bg-daw-accent text-white' 
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              <Icon size={16} />
              <span className="text-sm">{label}</span>
            </button>
          ))}
          
          <button
            onClick={() => setShowChat(!showChat)}
            className={`p-2 rounded-lg transition-colors ${
              showChat 
                ? 'bg-daw-accent text-white' 
                : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
            }`}
          >
            <MessageCircle size={20} />
          </button>
        </div>
      </div>
    </header>
  );
};