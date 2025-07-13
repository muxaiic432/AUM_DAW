import React, { useState } from 'react';
import { BookOpen, ChevronRight, ChevronDown, Play, Music, Sliders, MessageCircle, BarChart3 } from 'lucide-react';

export const UserManual: React.FC = () => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['getting-started']));

  const toggleSection = (sectionId: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(sectionId)) {
      newExpanded.delete(sectionId);
    } else {
      newExpanded.add(sectionId);
    }
    setExpandedSections(newExpanded);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: Play,
      content: [
        {
          title: 'Welcome to AI DAW Studio',
          content: `AI DAW Studio is an intelligent Digital Audio Workstation that combines traditional music production tools with AI-powered assistance. The integrated chat assistant provides real-time guidance for music theory, composition, and mixing.`
        },
        {
          title: 'First Steps',
          content: `1. Create your first track by clicking the "Add Track" buttons in the Tracks panel
2. Choose between Audio, MIDI, or Instrument tracks
3. Start the AI assistant by clicking the chat icon
4. Begin composing with the Piano Roll or record audio directly`
        },
        {
          title: 'Interface Overview',
          content: `The interface consists of five main sections:
• Tracks Panel - Manage your audio and MIDI tracks
• Piano Roll - Edit MIDI notes and melodies
• Mixer - Control levels, EQ, and effects
• Analyzer - Get AI-powered project analysis
• Chat Assistant - Your intelligent production companion`
        }
      ]
    },
    {
      id: 'tracks',
      title: 'Working with Tracks',
      icon: Music,
      content: [
        {
          title: 'Track Types',
          content: `Audio Tracks: Record and play back audio files like vocals, guitars, or live instruments.

MIDI Tracks: Sequence note data that can trigger virtual instruments or external hardware.

Instrument Tracks: Built-in synthesizers and samplers that respond to MIDI input.`
        },
        {
          title: 'Track Controls',
          content: `Each track includes:
• Volume fader - Control the track's output level
• Pan control - Position the track in the stereo field
• Mute button (M) - Silence the track
• Solo button (S) - Play only this track
• Settings - Access advanced track options`
        },
        {
          title: 'Recording',
          content: `To record:
1. Select an Audio or Instrument track
2. Click the record button in the transport
3. Play your instrument or sing
4. Click stop when finished
The recording will appear as a clip on your track.`
        }
      ]
    },
    {
      id: 'piano-roll',
      title: 'Piano Roll Editor',
      icon: Music,
      content: [
        {
          title: 'MIDI Editing',
          content: `The Piano Roll is where you create and edit MIDI notes:
• Click on the grid to add notes
• Drag notes to change pitch or timing
• Resize notes to change duration
• Use the piano keys on the left to audition notes`
        },
        {
          title: 'Recording MIDI',
          content: `1. Select an Instrument or MIDI track
2. Click "Start Recording" in the Piano Roll
3. Play notes using the on-screen piano or external keyboard
4. Click "Stop Recording" when finished`
        },
        {
          title: 'Editing Tips',
          content: `• Use the grid to snap notes to musical timing
• Hold Shift while clicking to select multiple notes
• Right-click for additional editing options
• The velocity of notes affects how loud they play`
        }
      ]
    },
    {
      id: 'mixer',
      title: 'Mixing Console',
      icon: Sliders,
      content: [
        {
          title: 'Channel Strips',
          content: `Each track has its own channel strip with:
• EQ controls (High, Mid, Low frequencies)
• Send effects (Reverb, Delay)
• Pan control for stereo positioning
• Volume fader for level control
• Mute and Solo buttons`
        },
        {
          title: 'Master Section',
          content: `The Master channel controls the final output:
• Master EQ affects the entire mix
• Master volume controls overall loudness
• Master balance adjusts left/right stereo balance
• This is where you apply final mastering effects`
        },
        {
          title: 'Mixing Tips',
          content: `• Start with levels - get a good balance before adding effects
• Use EQ to carve out space for each instrument
• Add reverb and delay sparingly for depth
• Reference your mix on different speakers/headphones`
        }
      ]
    },
    {
      id: 'ai-assistant',
      title: 'AI Assistant',
      icon: MessageCircle,
      content: [
        {
          title: 'Chat Interface',
          content: `The AI assistant provides intelligent help through natural conversation:
• Ask questions about music theory
• Get suggestions for chord progressions
• Receive mixing advice
• Learn about song structure and arrangement`
        },
        {
          title: 'Contextual Analysis',
          content: `The assistant analyzes your project in real-time:
• Detects the musical key and chord progressions
• Suggests complementary harmonies
• Recommends mixing techniques for your genre
• Provides theory lessons relevant to your music`
        },
        {
          title: 'Assistance Levels',
          content: `Customize the assistant's behavior:
• Minimal: Basic suggestions only
• Moderate: Balanced guidance and tips
• Comprehensive: Detailed explanations and examples

Adjust your skill level to receive appropriate advice for your experience.`
        },
        {
          title: 'Quick Actions',
          content: `Use the quick action buttons for common requests:
• "Suggest chord progressions"
• "Help with mixing"
• "Explain music theory"
• "Arrangement ideas"
• "Song structure tips"`
        }
      ]
    },
    {
      id: 'analyzer',
      title: 'Project Analyzer',
      icon: BarChart3,
      content: [
        {
          title: 'Real-time Analysis',
          content: `The Project Analyzer provides comprehensive insights:
• Musical key detection
• Chord progression analysis
• Genre classification
• Track count and arrangement overview`
        },
        {
          title: 'AI Suggestions',
          content: `Get intelligent recommendations in four categories:

Harmony: Chord progressions and scale suggestions
Arrangement: Instrumentation and layering ideas
Mixing: EQ, compression, and effects guidance
Structure: Song form and section organization`
        },
        {
          title: 'Theory Lessons',
          content: `Personalized music theory lessons based on:
• Your current project's musical content
• Your skill level and learning goals
• Concepts that will improve your composition
• Practical applications you can use immediately`
        }
      ]
    },
    {
      id: 'workflow',
      title: 'Production Workflow',
      icon: Play,
      content: [
        {
          title: 'Typical Session Flow',
          content: `1. Start with a basic idea (melody, chord progression, or rhythm)
2. Create tracks for different instruments
3. Record or program your initial ideas
4. Use the AI assistant to develop your composition
5. Arrange your song structure (intro, verse, chorus, etc.)
6. Mix your tracks using the mixer console
7. Get final suggestions from the project analyzer`
        },
        {
          title: 'Collaboration with AI',
          content: `Make the most of AI assistance:
• Ask for help when you're stuck creatively
• Use theory lessons to understand why certain things work
• Get mixing advice specific to your genre
• Learn from suggestions even if you don't use them all`
        },
        {
          title: 'Best Practices',
          content: `• Save your project frequently
• Experiment with different arrangements
• Don't be afraid to ask the AI "why" something works
• Use the analyzer to check your progress
• Take breaks and listen with fresh ears`
        }
      ]
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts',
      icon: BookOpen,
      content: [
        {
          title: 'Transport Controls',
          content: `Spacebar: Play/Pause
Enter: Stop
R: Record
Home: Return to beginning`
        },
        {
          title: 'View Navigation',
          content: `1: Tracks view
2: Piano Roll view
3: Mixer view
4: Analyzer view
5: User Manual
C: Toggle Chat Assistant`
        },
        {
          title: 'Editing',
          content: `Ctrl+Z: Undo
Ctrl+Y: Redo
Ctrl+C: Copy
Ctrl+V: Paste
Delete: Remove selected items`
        }
      ]
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: BookOpen,
      content: [
        {
          title: 'Audio Issues',
          content: `No sound from tracks:
• Check track volume and mute status
• Verify master volume is up
• Ensure your audio device is connected
• Try refreshing the browser page`
        },
        {
          title: 'Performance',
          content: `If the application runs slowly:
• Close other browser tabs
• Reduce the number of tracks
• Disable effects temporarily
• Use a modern browser (Chrome, Firefox, Safari)`
        },
        {
          title: 'AI Assistant',
          content: `If the assistant isn't responding:
• Check your internet connection
• Try rephrasing your question
• Use the quick action buttons
• Restart the chat by refreshing the page`
        }
      ]
    }
  ];

  return (
    <div className="h-full bg-daw-darker overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center mb-6">
          <BookOpen className="mr-3 text-daw-accent" size={24} />
          <h1 className="text-2xl font-bold">AI DAW Studio User Manual</h1>
        </div>

        <div className="space-y-4">
          {sections.map((section) => {
            const Icon = section.icon;
            const isExpanded = expandedSections.has(section.id);

            return (
              <div key={section.id} className="bg-daw-dark rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full p-4 flex items-center justify-between hover:bg-gray-700 transition-colors"
                >
                  <div className="flex items-center">
                    <Icon className="mr-3 text-daw-accent" size={20} />
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                  </div>
                  {isExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                </button>

                {isExpanded && (
                  <div className="px-4 pb-4">
                    {section.content.map((item, index) => (
                      <div key={index} className="mb-6 last:mb-0">
                        <h3 className="text-md font-medium mb-2 text-daw-accent">
                          {item.title}
                        </h3>
                        <div className="text-gray-300 whitespace-pre-line leading-relaxed">
                          {item.content}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-8 p-4 bg-daw-accent bg-opacity-10 border border-daw-accent rounded-lg">
          <h3 className="font-semibold mb-2 text-daw-accent">Need More Help?</h3>
          <p className="text-sm text-gray-300">
            The AI assistant is always available to answer questions and provide guidance. 
            Click the chat icon to start a conversation about any aspect of music production!
          </p>
        </div>
      </div>
    </div>
  );
};