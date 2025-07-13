import React, { useState, useRef } from 'react';
import { useProject } from '../contexts/ProjectContext';

const NOTES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const OCTAVES = [6, 5, 4, 3, 2, 1];

export const PianoRoll: React.FC = () => {
  const { project, audioEngine } = useProject();
  const [selectedTrack, setSelectedTrack] = useState<string | null>(
    project.tracks.find(t => t.type === 'instrument')?.id || null
  );
  const [isRecording, setIsRecording] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  const instrumentTracks = project.tracks.filter(t => t.type === 'instrument' || t.type === 'midi');

  const playNote = (note: string, octave: number) => {
    if (selectedTrack) {
      const noteWithOctave = `${note}${octave}`;
      audioEngine.playNote(selectedTrack, noteWithOctave);
    }
  };

  const isBlackKey = (note: string) => note.includes('#');

  return (
    <div className="h-full bg-daw-darker flex">
      {/* Track Selector */}
      <div className="w-64 bg-daw-dark border-r border-gray-700 p-4">
        <h3 className="text-lg font-semibold mb-4">Piano Roll</h3>
        
        <div className="mb-4">
          <label className="block text-sm text-gray-400 mb-2">Select Track:</label>
          <select
            value={selectedTrack || ''}
            onChange={(e) => setSelectedTrack(e.target.value || null)}
            className="w-full bg-gray-800 border border-gray-600 rounded px-3 py-2 text-white"
          >
            <option value="">Select a track...</option>
            {instrumentTracks.map(track => (
              <option key={track.id} value={track.id}>
                {track.name}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <button
            onClick={() => setIsRecording(!isRecording)}
            className={`w-full px-4 py-2 rounded transition-colors ${
              isRecording 
                ? 'bg-daw-error hover:bg-red-600' 
                : 'bg-daw-accent hover:bg-blue-600'
            }`}
          >
            {isRecording ? 'Stop Recording' : 'Start Recording'}
          </button>
          
          <div className="text-xs text-gray-400">
            {selectedTrack ? 'Ready to play/record' : 'Select a track first'}
          </div>
        </div>
      </div>

      {/* Piano Keys */}
      <div className="w-20 bg-gray-900 border-r border-gray-700">
        <div className="h-8 border-b border-gray-700"></div>
        {OCTAVES.map(octave => 
          NOTES.slice().reverse().map(note => (
            <div
              key={`${note}${octave}`}
              className={`h-6 border-b border-gray-800 cursor-pointer transition-colors flex items-center justify-end pr-2 text-xs ${
                isBlackKey(note)
                  ? 'bg-gray-800 hover:bg-gray-700 text-white'
                  : 'bg-gray-100 hover:bg-gray-200 text-black'
              }`}
              onClick={() => playNote(note, octave)}
            >
              {note}{octave}
            </div>
          ))
        )}
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-auto">
        <div className="h-8 bg-daw-dark border-b border-gray-700 flex">
          {Array.from({ length: 32 }, (_, i) => (
            <div
              key={i}
              className="w-8 border-r border-gray-600 flex items-center justify-center text-xs text-gray-400"
            >
              {i + 1}
            </div>
          ))}
        </div>
        
        <div ref={gridRef} className="relative">
          {OCTAVES.map(octave => 
            NOTES.slice().reverse().map((note, noteIndex) => (
              <div
                key={`${note}${octave}`}
                className={`h-6 border-b border-gray-800 flex ${
                  isBlackKey(note) ? 'bg-gray-900' : 'bg-gray-800'
                }`}
              >
                {Array.from({ length: 32 }, (_, i) => (
                  <div
                    key={i}
                    className="w-8 border-r border-gray-700 hover:bg-daw-accent hover:bg-opacity-30 cursor-pointer"
                    onClick={() => playNote(note, octave)}
                  />
                ))}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};