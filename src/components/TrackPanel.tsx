import React, { useState } from 'react';
import { Plus, Volume2, VolumeX, Headphones, Settings, Music } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { Track } from '../types';

export const TrackPanel: React.FC = () => {
  const { project, setProject, audioEngine } = useProject();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(null);

  const addTrack = (type: 'audio' | 'midi' | 'instrument') => {
    const newTrack: Track = {
      id: Date.now().toString(),
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Track ${project.tracks.length + 1}`,
      type,
      volume: 0.8,
      pan: 0,
      muted: false,
      solo: false,
      effects: [],
      clips: []
    };

    if (type === 'instrument') {
      audioEngine.createSynth(newTrack.id);
    }

    setProject(prev => ({
      ...prev,
      tracks: [...prev.tracks, newTrack]
    }));
  };

  const updateTrack = (trackId: string, updates: Partial<Track>) => {
    setProject(prev => ({
      ...prev,
      tracks: prev.tracks.map(track => 
        track.id === trackId ? { ...track, ...updates } : track
      )
    }));
  };

  const deleteTrack = (trackId: string) => {
    setProject(prev => ({
      ...prev,
      tracks: prev.tracks.filter(track => track.id !== trackId)
    }));
  };

  return (
    <div className="h-full bg-daw-darker p-4">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Tracks</h2>
        <div className="flex space-x-2">
          <button
            onClick={() => addTrack('audio')}
            className="px-3 py-1 bg-daw-accent hover:bg-blue-600 rounded text-sm transition-colors"
          >
            <Plus size={16} className="inline mr-1" />
            Audio
          </button>
          <button
            onClick={() => addTrack('midi')}
            className="px-3 py-1 bg-daw-secondary hover:bg-indigo-600 rounded text-sm transition-colors"
          >
            <Plus size={16} className="inline mr-1" />
            MIDI
          </button>
          <button
            onClick={() => addTrack('instrument')}
            className="px-3 py-1 bg-daw-success hover:bg-green-600 rounded text-sm transition-colors"
          >
            <Plus size={16} className="inline mr-1" />
            Instrument
          </button>
        </div>
      </div>

      <div className="space-y-2">
        {project.tracks.map((track) => (
          <div
            key={track.id}
            className={`track-channel ${selectedTrack === track.id ? 'border-daw-accent' : ''}`}
            onClick={() => setSelectedTrack(track.id)}
          >
            <div className="flex items-center justify-between mb-2">
              <input
                type="text"
                value={track.name}
                onChange={(e) => updateTrack(track.id, { name: e.target.value })}
                className="bg-transparent text-white font-medium focus:outline-none focus:bg-gray-800 px-2 py-1 rounded"
              />
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTrack(track.id, { muted: !track.muted });
                  }}
                  className={`p-1 rounded ${track.muted ? 'bg-daw-error' : 'bg-gray-600 hover:bg-gray-500'} transition-colors`}
                >
                  {track.muted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    updateTrack(track.id, { solo: !track.solo });
                  }}
                  className={`p-1 rounded ${track.solo ? 'bg-daw-warning' : 'bg-gray-600 hover:bg-gray-500'} transition-colors`}
                >
                  <Headphones size={16} />
                </button>
                <button className="p-1 bg-gray-600 hover:bg-gray-500 rounded transition-colors">
                  <Settings size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Vol</span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={track.volume}
                  onChange={(e) => updateTrack(track.id, { volume: parseFloat(e.target.value) })}
                  className="w-20"
                />
                <span className="text-xs text-gray-400 w-8">{Math.round(track.volume * 100)}</span>
              </div>

              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Pan</span>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.01"
                  value={track.pan}
                  onChange={(e) => updateTrack(track.id, { pan: parseFloat(e.target.value) })}
                  className="w-20"
                />
                <span className="text-xs text-gray-400 w-8">{track.pan > 0 ? 'R' : track.pan < 0 ? 'L' : 'C'}</span>
              </div>

              <div className="flex-1 bg-gray-800 h-8 rounded relative">
                <div className="text-xs text-gray-400 absolute inset-0 flex items-center justify-center">
                  {track.clips.length} clip{track.clips.length !== 1 ? 's' : ''}
                </div>
              </div>
            </div>

            {track.type === 'instrument' && (
              <div className="mt-2 text-xs text-gray-400">
                Instrument: {track.instrument?.name || 'Default Synth'}
              </div>
            )}
          </div>
        ))}

        {project.tracks.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Music size={48} className="mx-auto mb-4 opacity-50" />
            <p>No tracks yet. Add your first track to get started!</p>
          </div>
        )}
      </div>
    </div>
  );
};