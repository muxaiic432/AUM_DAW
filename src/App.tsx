import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { TrackPanel } from './components/TrackPanel';
import { ChatAssistant } from './components/ChatAssistant';
import { PianoRoll } from './components/PianoRoll';
import { MixerPanel } from './components/MixerPanel';
import { ProjectAnalyzer } from './components/ProjectAnalyzer';
import { UserManual } from './components/UserManual';
import { AudioEngine } from './services/AudioEngine';
import { ProjectContext } from './contexts/ProjectContext';
import { UserProfileContext } from './contexts/UserProfileContext';
import { ProjectData, UserProfile } from './types';

function App() {
  const [currentView, setCurrentView] = useState<'tracks' | 'piano' | 'mixer' | 'analyzer' | 'manual'>('tracks');
  const [showChat, setShowChat] = useState(true);
  const [audioEngine] = useState(() => new AudioEngine());
  const [project, setProject] = useState<ProjectData>({
    id: '1',
    name: 'New Project',
    bpm: 120,
    key: 'C',
    timeSignature: '4/4',
    tracks: [],
    effects: [],
    mixerSettings: {
      masterVolume: 0.8,
      masterPan: 0
    }
  });

  const [userProfile, setUserProfile] = useState<UserProfile>({
    id: '1',
    skillLevel: 'intermediate',
    preferences: {
      genres: ['electronic', 'pop'],
      assistanceLevel: 'moderate',
      learningGoals: ['music theory', 'mixing']
    },
    progress: {
      theoryKnowledge: 0.6,
      mixingSkills: 0.4,
      completedLessons: []
    },
    history: {
      commonTechniques: [],
      favoritePlugins: [],
      recentProjects: []
    }
  });

  useEffect(() => {
    audioEngine.initialize();
    return () => audioEngine.dispose();
  }, [audioEngine]);

  return (
    <ProjectContext.Provider value={{ project, setProject, audioEngine }}>
      <UserProfileContext.Provider value={{ userProfile, setUserProfile }}>
        <div className="h-screen flex flex-col bg-daw-darker">
          <Header 
            currentView={currentView} 
            setCurrentView={setCurrentView}
            showChat={showChat}
            setShowChat={setShowChat}
          />
          
          <div className="flex-1 flex overflow-hidden">
            <div className={`flex-1 transition-all duration-300 ${showChat ? 'mr-80' : ''}`}>
              {currentView === 'tracks' && <TrackPanel />}
              {currentView === 'piano' && <PianoRoll />}
              {currentView === 'mixer' && <MixerPanel />}
              {currentView === 'analyzer' && <ProjectAnalyzer />}
              {currentView === 'manual' && <UserManual />}
            </div>
            
            {showChat && (
              <div className="w-80 border-l border-gray-700 bg-daw-dark">
                <ChatAssistant />
              </div>
            )}
          </div>
        </div>
      </UserProfileContext.Provider>
    </ProjectContext.Provider>
  );
}

export default App;