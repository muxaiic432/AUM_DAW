import React, { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, Music, Lightbulb } from 'lucide-react';
import { useProject } from '../contexts/ProjectContext';
import { useUserProfile } from '../contexts/UserProfileContext';
import { AIAssistant } from '../services/AIAssistant';
import { AnalysisResult } from '../types';

export const ProjectAnalyzer: React.FC = () => {
  const { project } = useProject();
  const { userProfile } = useUserProfile();
  const [analysis, setAnalysis] = useState<AnalysisResult | null>(null);
  const [aiAssistant] = useState(() => new AIAssistant());

  useEffect(() => {
    const result = aiAssistant.analyzeProject(project);
    setAnalysis(result);
  }, [project, aiAssistant]);

  if (!analysis) {
    return (
      <div className="h-full bg-daw-darker p-4 flex items-center justify-center">
        <div className="text-center">
          <BarChart3 size={48} className="mx-auto mb-4 text-gray-500" />
          <p className="text-gray-500">Analyzing your project...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full bg-daw-darker p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-6 flex items-center">
        <BarChart3 className="mr-2" />
        Project Analysis
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Overview */}
        <div className="bg-daw-dark rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4 flex items-center">
            <Music className="mr-2 text-daw-accent" />
            Project Overview
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-400">Key:</span>
              <span className="font-medium">{analysis.key} Major</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Genre:</span>
              <span className="font-medium capitalize">{analysis.genre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Tracks:</span>
              <span className="font-medium">{project.tracks.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">BPM:</span>
              <span className="font-medium">{project.bpm}</span>
            </div>
          </div>
        </div>

        {/* Chord Progression */}
        <div className="bg-daw-dark rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4">Chord Progression</h3>
          <div className="flex space-x-2 mb-4">
            {analysis.chordProgression.map((chord, index) => (
              <div
                key={index}
                className="bg-daw-accent bg-opacity-20 border border-daw-accent rounded px-3 py-2 text-center"
              >
                {chord}
              </div>
            ))}
          </div>
          <p className="text-sm text-gray-400">
            This progression is commonly used in {analysis.genre} music and creates a strong harmonic foundation.
          </p>
        </div>

        {/* Harmony Suggestions */}
        <div className="bg-daw-dark rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4 flex items-center">
            <Lightbulb className="mr-2 text-daw-warning" />
            Harmony Suggestions
          </h3>
          <ul className="space-y-2">
            {analysis.suggestions.harmony.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-daw-warning rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Arrangement Suggestions */}
        <div className="bg-daw-dark rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 text-daw-success" />
            Arrangement Ideas
          </h3>
          <ul className="space-y-2">
            {analysis.suggestions.arrangement.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-daw-success rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Mixing Suggestions */}
        <div className="bg-daw-dark rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4">Mixing Tips</h3>
          <ul className="space-y-2">
            {analysis.suggestions.mixing.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-daw-secondary rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Structure Suggestions */}
        <div className="bg-daw-dark rounded-lg p-6">
          <h3 className="text-md font-semibold mb-4">Song Structure</h3>
          <ul className="space-y-2">
            {analysis.suggestions.structure.map((suggestion, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-daw-accent rounded-full mt-2 mr-3 flex-shrink-0" />
                <span className="text-sm text-gray-300">{suggestion}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Theory Lessons */}
      <div className="mt-6">
        <h3 className="text-md font-semibold mb-4">Recommended Theory Lessons</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {analysis.theoryLessons.map((lesson, index) => (
            <div key={index} className="bg-daw-dark rounded-lg p-4 border border-gray-700 hover:border-daw-accent transition-colors cursor-pointer">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-medium text-sm">{lesson.title}</h4>
                <span className={`text-xs px-2 py-1 rounded ${
                  lesson.difficulty === 'beginner' ? 'bg-green-600' :
                  lesson.difficulty === 'intermediate' ? 'bg-yellow-600' :
                  'bg-red-600'
                }`}>
                  {lesson.difficulty}
                </span>
              </div>
              <p className="text-xs text-gray-400 line-clamp-3">{lesson.content}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};