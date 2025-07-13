import * as Tone from 'tone';

export class AudioEngine {
  private synths: Map<string, Tone.Synth> = new Map();
  private effects: Map<string, Tone.Effect> = new Map();
  private isInitialized = false;

  async initialize() {
    if (this.isInitialized) return;
    
    try {
      await Tone.start();
      this.isInitialized = true;
      console.log('Audio engine initialized');
    } catch (error) {
      console.error('Failed to initialize audio engine:', error);
    }
  }

  createSynth(trackId: string, type: 'synth' | 'fmSynth' | 'amSynth' = 'synth') {
    let synth: Tone.Synth;
    
    switch (type) {
      case 'fmSynth':
        synth = new Tone.FMSynth().toDestination();
        break;
      case 'amSynth':
        synth = new Tone.AMSynth().toDestination();
        break;
      default:
        synth = new Tone.Synth().toDestination();
    }
    
    this.synths.set(trackId, synth);
    return synth;
  }

  getSynth(trackId: string) {
    return this.synths.get(trackId);
  }

  playNote(trackId: string, note: string, duration: string = '8n') {
    const synth = this.getSynth(trackId);
    if (synth) {
      synth.triggerAttackRelease(note, duration);
    }
  }

  createEffect(effectId: string, type: 'reverb' | 'delay' | 'distortion' | 'filter') {
    let effect: Tone.Effect;
    
    switch (type) {
      case 'reverb':
        effect = new Tone.Reverb(2);
        break;
      case 'delay':
        effect = new Tone.FeedbackDelay('8n', 0.3);
        break;
      case 'distortion':
        effect = new Tone.Distortion(0.4);
        break;
      case 'filter':
        effect = new Tone.Filter(1000, 'lowpass');
        break;
      default:
        effect = new Tone.Reverb(1);
    }
    
    this.effects.set(effectId, effect);
    return effect;
  }

  setBPM(bpm: number) {
    Tone.Transport.bpm.value = bpm;
  }

  start() {
    Tone.Transport.start();
  }

  stop() {
    Tone.Transport.stop();
  }

  pause() {
    Tone.Transport.pause();
  }

  dispose() {
    this.synths.forEach(synth => synth.dispose());
    this.effects.forEach(effect => effect.dispose());
    this.synths.clear();
    this.effects.clear();
  }
}