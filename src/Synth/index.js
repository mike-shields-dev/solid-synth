import * as Tone from "tone";
import midiNotes from "../utils/midiNotes";

class SubtractivePolySynth extends Tone.PolySynth {
  #validWaveforms = ["sine", "triangle", "sawtooth", "pulse"];
  #octaveMin = 0;
  #octaveMax = 10;
  #notesPerOctave = 12;

  constructor() {
    super();
    this._notes = midiNotes;
    this._noteOffset = 48;
  }

  updateNotes({ noteNumber, isActive }) {
    if (
      typeof noteNumber !== "number" ||
      noteNumber < 0 ||
      noteNumber > this.notes.length - 1
    )
      throw Error(
        `Invalid noteNumber: ${noteNumber},
        Valid noteNumbers: 0 - ${this.notes.length - 1}`
      );

    this._notes = this._notes.map((note, i) => {
      if (noteNumber === i && isActive !== note.isActive) {
        if (isActive) this.triggerAttack(note.freq);
        if (!isActive) this.triggerRelease(note.freq);
        return { ...note, isActive };
      }
      return note;
    });
  }

  get notes() {
    return this._notes;
  }

  get validWaveforms() {
    return this.#validWaveforms;
  }

  set waveform(waveform) {
    if (!this.#validWaveforms.includes(waveform))
      throw Error(
        `Invalid waveform: ${waveform}, 
        Valid waveforms: ${this.#validWaveforms}`
      );

    this.set({
      oscillator: {
        type: waveform,
      },
    });
  }

  get waveform() {
    return this.options.oscillator.type;
  }

  get notesPerOctave() {
    return this.#notesPerOctave;
  }

  get octaveMin() {
    return this.#octaveMin;
  }

  get octaveMax() {
    return this.#octaveMax;
  }

  get noteOffset() {
    return this._noteOffset;
  }

  set noteOffset(newOffset) {
    this._noteOffset = newOffset;
  }

  get octave() {
    return this.noteOffset / this.#notesPerOctave;
  }

  set octave(octave) {
    if (
      typeof octave !== "number" ||
      octave < this.#octaveMin ||
      octave > this.#octaveMax
    )
      throw Error(
        `Invalid octave: ${octave}, 
        Valid octave range: ${this.#octaveMin} - ${this.#octaveMax}`
      );

    this.releaseAll();
    this.noteOffset = octave * this.#notesPerOctave;
  }
}

const synth = new SubtractivePolySynth(Tone.MonoSynth);
synth.toDestination();

export default synth;
