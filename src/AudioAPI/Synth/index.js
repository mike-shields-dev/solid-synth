import * as Tone from "tone";
import midiNotes from "../../utils/midiNotes";
import { masterGain } from "../MasterGain";

console.log({ masterGain });
class PolySynth {
  #validWaveforms = ["sawtooth", "sine", "triangle", "square"];
  #octaveMin = 0;
  #octaveMax = 10;
  #notesPerOctave = 12;

  constructor() {
    this._noteOffset = 48;
    this._voices = midiNotes.map((midiNote) => ({
      ...midiNote,
      source: new Tone.MonoSynth(),
    }));
    this._voices.forEach((voice) => voice.source.connect(masterGain.node));
  }

  get notesPerOctave() {
    return this.#notesPerOctave;
  }

  get noteOffset() {
    return this._noteOffset;
  }

  get octave() {
    return this.noteOffset / this.#notesPerOctave;
  }

  get octaveMin() {
    return this.#octaveMin;
  }

  get octaveMax() {
    return this.#octaveMax;
  }

  get voices() {
    return this._voices;
  }

  get validWaveforms() {
    return this.#validWaveforms;
  }

  get waveform() {
    return this.voices[0].source.oscillator.type;
  }

  set waveform(type) {
    if (!this.#validWaveforms.includes(type))
      throw Error(
        `Invalid waveform: ${type}, 
      Valid waveforms: ${this.#validWaveforms}`
      );

    this._voices.forEach((voice) => {
      voice.source.set({ oscillator: { type: type } });
    });
  }

  onNoteEvent({ noteNumber, isActive }) {
    const voice = this._voices[noteNumber];
    if (isActive) {
      voice.source.triggerAttack(voice.freq);
      voice.isActive = true;
    }
    if (!isActive) {
      voice.source.triggerRelease();
      voice.isActive = false;
    }
  }

  releaseActiveNotes() {
    this._voices.forEach(
      (voice) => voice.isActive && voice.source.triggerRelease()
    );
  }

  get polyphonicFilterFrequency() {
    return this.voices[0].source;
  }

  set polyphonicFilterFrequency(frequency) {
    this.voices.forEach((voice) => voice.source.filter.set({ frequency }));
  }
}

const synth = new PolySynth();

export default synth;
