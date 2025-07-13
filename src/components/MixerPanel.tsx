import React from 'react';
import { useProject } from '../contexts/ProjectContext';
import { Volume2, VolumeX, Headphones, Settings } from 'lucide-react';

export const MixerPanel: React.FC = () => {
  const { project, setProject } = useProject();

  const updateTrack = (trackId: string, updates: any) => {
    setProject(prev => ({
      ...prev,
      tracks: prev.tracks.map(track => 
        track.id === trackId ? { ...track, ...updates } : track
      )
    }));
  };

  const updateMasterSettings = (updates: any) => {
    setProject(prev => ({
      ...prev,
      mixerSettings: { ...prev.mixerSettings, ...updates }
    }));
  };

  return (
    <div className="h-full bg-daw-darker p-4">
      <h2 className="text-lg font-semibold mb-4">Mixer</h2>
      
      <div className="flex space-x-4 overflow-x-auto">
        {/* Track Channels */}
        {project.tracks.map((track) => (
          <div key={track.id} className="bg-daw-dark rounded-lg p-4 min-w-[120px] flex flex-col">
            {/* Track Name */}
            <div className="text-sm font-medium mb-4 text-center truncate">
              {track.name}
            </div>

            {/* EQ Section */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">EQ</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">High</span>
                  <div className="control-knob"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Mid</span>
                  <div className="control-knob"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Low</span>
                  <div className="control-knob"></div>
                </div>
              </div>
            </div>

            {/* Send Effects */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">Sends</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Rev</span>
                  <div className="control-knob"></div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Del</span>
                  <div className="control-knob"></div>
                </div>
              </div>
            </div>

            {/* Pan */}
            <div className="mb-4">
              <div className="text-xs text-gray-400 mb-2">Pan</div>
              <input
                type="range"
                min="-1"
                max="1"
                step="0.01"
                value={track.pan}
                onChange={(e) => updateTrack(track.id, { pan: parseFloat(e.target.value) })}
                className="w-full"
              />
            </div>

            {/* Buttons */}
            <div className="flex justify-center space-x-1 mb-4">
              <button
                onClick={() => updateTrack(track.id, { muted: !track.muted })}
                className={`p-1 rounded text-xs ${
                  track.muted ? 'bg-daw-error' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                M
              </button>
              <button
                onClick={() => updateTrack(track.id, { solo: !track.solo })}
                className={`p-1 rounded text-xs ${
                  track.solo ? 'bg-daw-warning' : 'bg-gray-600 hover:bg-gray-500'
                }`}
              >
                S
              </button>
            </div>

            {/* Volume Fader */}
            <div className="flex-1 flex flex-col items-center">
              <div className="fader bg-gray-800 relative">
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={track.volume}
                  onChange={(e) => updateTrack(track.id, { volume: parseFloat(e.target.value) })}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
                />
                <div 
                  className="absolute bottom-0 left-0 right-0 bg-daw-accent rounded-full transition-all"
                  style={{ height: `${track.volume * 100}%` }}
                />
                <div 
                  className="absolute w-8 h-3 bg-white border border-gray-400 rounded transform -translate-x-1"
                  style={{ bottom: `${track.volume * 100}%`, marginBottom: '-6px' }}
                />
              </div>
              <div className="text-xs mt-2 text-gray-400">
                {Math.round(track.volume * 100)}
              </div>
            </div>
          </div>
        ))}

        {/* Master Channel */}
        <div className="bg-daw-accent bg-opacity-20 rounded-lg p-4 min-w-[120px] flex flex-col border border-daw-accent">
          <div className="text-sm font-medium mb-4 text-center text-daw-accent">
            MASTER
          </div>

          {/* Master EQ */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-2">Master EQ</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">High</span>
                <div className="control-knob"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Mid</span>
                <div className="control-knob"></div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs">Low</span>
                <div className="control-knob"></div>
              </div>
            </div>
          </div>

          {/* Master Pan */}
          <div className="mb-4">
            <div className="text-xs text-gray-400 mb-2">Balance</div>
            <input
              type="range"
              min="-1"
              max="1"
              step="0.01"
              value={project.mixerSettings.masterPan}
              onChange={(e) => updateMasterSettings({ masterPan: parseFloat(e.target.value) })}
              className="w-full"
            />
          </div>

          {/* Master Volume */}
          <div className="flex-1 flex flex-col items-center">
            <div className="fader bg-gray-800 relative">
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={project.mixerSettings.masterVolume}
                onChange={(e) => updateMasterSettings({ masterVolume: parseFloat(e.target.value) })}
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                style={{ writingMode: 'bt-lr', WebkitAppearance: 'slider-vertical' }}
              />
              <div 
                className="absolute bottom-0 left-0 right-0 bg-daw-accent rounded-full transition-all"
                style={{ height: `${project.mixerSettings.masterVolume * 100}%` }}
              />
              <div 
                className="absolute w-8 h-3 bg-white border border-gray-400 rounded transform -translate-x-1"
                style={{ bottom: `${project.mixerSettings.masterVolume * 100}%`, marginBottom: '-6px' }}
              />
            </div>
            <div className="text-xs mt-2 text-daw-accent">
              {Math.round(project.mixerSettings.masterVolume * 100)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};