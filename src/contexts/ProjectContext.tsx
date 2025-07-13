import React, { createContext, useContext } from 'react';
import { ProjectData } from '../types';
import { AudioEngine } from '../services/AudioEngine';

interface ProjectContextType {
  project: ProjectData;
  setProject: React.Dispatch<React.SetStateAction<ProjectData>>;
  audioEngine: AudioEngine;
}

export const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const useProject = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProject must be used within a ProjectProvider');
  }
  return context;
};