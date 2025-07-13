import { ProjectData, UserProfile, AnalysisResult, ChatMessage } from '../types';

export class AIAssistant {
  private musicTheoryDatabase = {
    keys: {
      'C': { notes: ['C', 'D', 'E', 'F', 'G', 'A', 'B'], chords: ['C', 'Dm', 'Em', 'F', 'G', 'Am', 'Bdim'] },
      'G': { notes: ['G', 'A', 'B', 'C', 'D', 'E', 'F#'], chords: ['G', 'Am', 'Bm', 'C', 'D', 'Em', 'F#dim'] },
      'D': { notes: ['D', 'E', 'F#', 'G', 'A', 'B', 'C#'], chords: ['D', 'Em', 'F#m', 'G', 'A', 'Bm', 'C#dim'] },
      'A': { notes: ['A', 'B', 'C#', 'D', 'E', 'F#', 'G#'], chords: ['A', 'Bm', 'C#m', 'D', 'E', 'F#m', 'G#dim'] },
      'E': { notes: ['E', 'F#', 'G#', 'A', 'B', 'C#', 'D#'], chords: ['E', 'F#m', 'G#m', 'A', 'B', 'C#m', 'D#dim'] },
      'F': { notes: ['F', 'G', 'A', 'Bb', 'C', 'D', 'E'], chords: ['F', 'Gm', 'Am', 'Bb', 'C', 'Dm', 'Edim'] }
    },
    progressions: {
      'pop': ['I-V-vi-IV', 'vi-IV-I-V', 'I-vi-IV-V'],
      'rock': ['I-bVII-IV-I', 'i-bVII-bVI-bVII', 'I-V-vi-iii-IV-I-IV-V'],
      'jazz': ['ii-V-I', 'I-vi-ii-V', 'iii-vi-ii-V-I'],
      'electronic': ['i-bVII-bVI-bVII', 'i-v-bVII-IV', 'i-bIII-bVII-bVI']
    },
    instruments: {
      'lead': ['synthesizer', 'electric guitar', 'violin', 'flute'],
      'bass': ['bass guitar', 'synthesizer bass', 'upright bass'],
      'rhythm': ['acoustic guitar', 'electric guitar', 'piano', 'synthesizer'],
      'percussion': ['drums', 'percussion', 'electronic drums']
    }
  };

  analyzeProject(project: ProjectData): AnalysisResult {
    const key = project.key;
    const keyData = this.musicTheoryDatabase.keys[key as keyof typeof this.musicTheoryDatabase.keys];
    
    // Analyze chord progression based on tracks
    const chordProgression = this.detectChordProgression(project);
    const genre = this.detectGenre(project);
    
    return {
      key,
      chordProgression,
      genre,
      suggestions: {
        harmony: this.generateHarmonySuggestions(key, chordProgression),
        arrangement: this.generateArrangementSuggestions(project),
        mixing: this.generateMixingSuggestions(project),
        structure: this.generateStructureSuggestions(project)
      },
      theoryLessons: this.generateTheoryLessons(key, chordProgression)
    };
  }

  private detectChordProgression(project: ProjectData): string[] {
    // Simplified chord detection based on track names and MIDI data
    const commonProgressions = ['I', 'V', 'vi', 'IV'];
    return commonProgressions;
  }

  private detectGenre(project: ProjectData): string {
    // Analyze instruments and patterns to detect genre
    const instrumentTypes = project.tracks.map(track => track.type);
    
    if (instrumentTypes.includes('instrument')) {
      return 'electronic';
    } else if (instrumentTypes.length > 4) {
      return 'rock';
    } else {
      return 'pop';
    }
  }

  private generateHarmonySuggestions(key: string, progression: string[]): string[] {
    const keyData = this.musicTheoryDatabase.keys[key as keyof typeof this.musicTheoryDatabase.keys];
    if (!keyData) return [];

    return [
      `Try adding a ${keyData.chords[5]} chord for emotional depth`,
      `Consider using ${keyData.chords[2]} as a passing chord`,
      `The ${keyData.chords[3]} chord would create nice tension before resolving to ${keyData.chords[0]}`,
      `Add some color with a ${keyData.chords[1]}7 chord`
    ];
  }

  private generateArrangementSuggestions(project: ProjectData): string[] {
    const trackCount = project.tracks.length;
    
    const suggestions = [
      'Consider adding a counter-melody in the bridge section',
      'Try doubling the bass line with a synthesizer for more weight',
      'Add some percussion elements to enhance the groove'
    ];

    if (trackCount < 4) {
      suggestions.push('Your arrangement could benefit from additional harmonic layers');
    }

    return suggestions;
  }

  private generateMixingSuggestions(project: ProjectData): string[] {
    return [
      'Apply a high-pass filter around 80Hz to the non-bass instruments',
      'Use compression with a 3:1 ratio on the drums for punch',
      'Add some reverb to create spatial depth',
      'Consider parallel compression on the drum bus',
      'Use EQ to carve out space for each instrument in the frequency spectrum'
    ];
  }

  private generateStructureSuggestions(project: ProjectData): string[] {
    return [
      'Try an intro-verse-chorus-verse-chorus-bridge-chorus structure',
      'Consider adding a pre-chorus to build tension',
      'Use a breakdown section to create dynamic contrast',
      'Add an outro that gradually reduces elements'
    ];
  }

  private generateTheoryLessons(key: string, progression: string[]): any[] {
    return [
      {
        title: `Understanding the Key of ${key}`,
        content: `The key of ${key} contains the notes: ${this.musicTheoryDatabase.keys[key as keyof typeof this.musicTheoryDatabase.keys]?.notes.join(', ')}. This gives us a palette of chords and melodies that naturally sound good together.`,
        difficulty: 'beginner'
      },
      {
        title: 'Chord Function and Roman Numerals',
        content: 'Roman numerals help us understand how chords function in a key. I is the tonic (home), V is the dominant (tension), and vi is the relative minor (emotional).',
        difficulty: 'intermediate'
      },
      {
        title: 'Voice Leading Principles',
        content: 'Good voice leading creates smooth transitions between chords. Try to move chord tones by the smallest possible interval.',
        difficulty: 'advanced'
      }
    ];
  }

  generateResponse(message: string, project: ProjectData, userProfile: UserProfile): ChatMessage {
    const analysis = this.analyzeProject(project);
    const lowerMessage = message.toLowerCase();
    
    let response = '';
    let context: any = {};

    if (lowerMessage.includes('chord') || lowerMessage.includes('harmony')) {
      response = this.generateHarmonyResponse(analysis, userProfile);
      context.suggestions = analysis.suggestions.harmony;
    } else if (lowerMessage.includes('mix') || lowerMessage.includes('eq') || lowerMessage.includes('compress')) {
      response = this.generateMixingResponse(analysis, userProfile);
      context.suggestions = analysis.suggestions.mixing;
    } else if (lowerMessage.includes('structure') || lowerMessage.includes('arrange')) {
      response = this.generateStructureResponse(analysis, userProfile);
      context.suggestions = analysis.suggestions.structure;
    } else if (lowerMessage.includes('theory') || lowerMessage.includes('learn')) {
      response = this.generateTheoryResponse(analysis, userProfile);
      context.examples = analysis.theoryLessons.map(lesson => lesson.title);
    } else {
      response = this.generateGeneralResponse(analysis, userProfile);
    }

    return {
      id: Date.now().toString(),
      type: 'ai',
      content: response,
      timestamp: new Date(),
      context
    };
  }

  private generateHarmonyResponse(analysis: AnalysisResult, userProfile: UserProfile): string {
    const suggestions = analysis.suggestions.harmony.slice(0, 2);
    return `Based on your project in ${analysis.key}, here are some harmonic suggestions:\n\n${suggestions.join('\n')}\n\nThese will add more interest to your chord progression while staying in key.`;
  }

  private generateMixingResponse(analysis: AnalysisResult, userProfile: UserProfile): string {
    const suggestions = analysis.suggestions.mixing.slice(0, 3);
    return `Here are some mixing tips for your current project:\n\n${suggestions.join('\n')}\n\nStart with these basics and adjust to taste!`;
  }

  private generateStructureResponse(analysis: AnalysisResult, userProfile: UserProfile): string {
    const suggestions = analysis.suggestions.structure.slice(0, 2);
    return `For song structure, consider:\n\n${suggestions.join('\n')}\n\nGood structure keeps listeners engaged throughout the song.`;
  }

  private generateTheoryResponse(analysis: AnalysisResult, userProfile: UserProfile): string {
    const lesson = analysis.theoryLessons.find(l => 
      userProfile.skillLevel === 'beginner' ? l.difficulty === 'beginner' :
      userProfile.skillLevel === 'intermediate' ? l.difficulty === 'intermediate' :
      l.difficulty === 'advanced'
    ) || analysis.theoryLessons[0];

    return `Let's explore: ${lesson.title}\n\n${lesson.content}\n\nWould you like me to explain this concept further or show you how to apply it in your project?`;
  }

  private generateGeneralResponse(analysis: AnalysisResult, userProfile: UserProfile): string {
    return `I'm here to help with your music production! Your project is in ${analysis.key} and appears to be ${analysis.genre}-style. I can assist with:\n\n• Chord progressions and harmony\n• Mixing and effects\n• Song structure\n• Music theory concepts\n\nWhat would you like to work on?`;
  }
}