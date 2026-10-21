/**
 * Romantic Web Audio engine for background melody & scratch sound effects.
 * Universal and zero-dependency, works directly in any browser.
 */

class RomanticAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private intervalId: number | null = null;
  private noteIndex: number = 0;

  // Gentle romantic melody in E major / C# minor
  // Notes in Hz: E4, G#4, B4, C#5, E5, F#5, D#5, B4
  private melodyNotes: number[] = [
    329.63, 415.30, 493.88, 554.37, 659.25, 554.37, 493.88, 415.30,
    369.99, 440.00, 554.37, 659.25, 739.99, 659.25, 554.37, 440.00,
    293.66, 369.99, 440.00, 554.37, 587.33, 493.88, 440.00, 369.99,
    329.63, 392.00, 493.88, 587.33, 659.25, 587.33, 493.88, 392.00
  ];

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMusic(): boolean {
    if (this.isPlaying) {
      this.stopMusic();
      return false;
    } else {
      this.startMusic();
      return true;
    }
  }

  public startMusic() {
    this.initContext();
    if (!this.ctx) return;
    this.isPlaying = true;
    this.noteIndex = 0;

    const playNext = () => {
      if (!this.isPlaying || !this.ctx) return;
      const freq = this.melodyNotes[this.noteIndex % this.melodyNotes.length];
      this.playMusicBoxTone(freq, 1.4, 0.08);

      // Play soft harmony pad every 4 notes
      if (this.noteIndex % 4 === 0) {
        this.playPadTone(freq / 2, 2.5, 0.04);
      }

      this.noteIndex++;
      this.intervalId = window.setTimeout(playNext, 600);
    };

    playNext();
  }

  public stopMusic() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this.intervalId = null;
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  // Soft music box chime tone
  private playMusicBoxTone(freq: number, duration: number, volume: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    // Envelope
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Warm gentle background pad
  private playPadTone(freq: number, duration: number, volume: number) {
    if (!this.ctx) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, this.ctx.currentTime + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + duration);
  }

  // Scratch tick sound (subtle sparkle)
  public playScratchShimmer() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      const freqs = [880, 1046.5, 1174.66, 1318.51, 1567.98];
      const randomFreq = freqs[Math.floor(Math.random() * freqs.length)];

      osc.type = 'sine';
      osc.frequency.setValueAtTime(randomFreq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.08);
    } catch {
      // Audio might be muted or blocked by browser policy
    }
  }

  // Wheel click tick sound
  public playWheelTick() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(920, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(320, this.ctx.currentTime + 0.03);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.03);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.03);
    } catch {
      // Audio might be muted
    }
  }

  // Envelope open paper glide sound
  public playEnvelopeOpenSound() {
    try {
      this.initContext();
      if (!this.ctx) return;

      // Soft paper rustle / wax pop
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.25));
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(300, this.ctx.currentTime + 0.15);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start();

      // Soft romantic chime to accompany letter opening
      setTimeout(() => {
        this.playMusicBoxTone(587.33, 1.2, 0.08); // D5
        setTimeout(() => {
          this.playMusicBoxTone(880, 1.6, 0.06); // A5
        }, 120);
      }, 60);
    } catch {
      // Audio might be muted or blocked
    }
  }

  // Triumphant love chord on full reveal
  public playRevealFanfare() {
    try {
      this.initContext();
      if (!this.ctx) return;
      const chord = [523.25, 659.25, 783.99, 1046.50]; // C Major arpeggio
      chord.forEach((freq, idx) => {
        setTimeout(() => {
          this.playMusicBoxTone(freq, 2.2, 0.12);
        }, idx * 120);
      });
    } catch {
      // Audio might be muted
    }
  }
}

export const romanticAudio = new RomanticAudioEngine();
