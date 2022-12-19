import * as Tone from "tone";

class SubtractivePolySynth extends Tone.PolySynth {
  constructor() {
    super();
    this.validWaveforms = ["sine", "triangle", "sawtooth", "pulse"];
  }

  set waveform(waveform) {
    if (!this.validWaveforms.includes(waveform)) {
      throw Error(
        `Invalid waveform: ${waveform} | Valid waveforms: ${this.validWaveforms}`
      );
    }
    this.set({
      oscillator: {
        type: waveform,
      },
    });
  }

  get waveform() {
    return this.options.oscillator.type;
  }
}

const synth = new SubtractivePolySynth(Tone.MonoSynth);
synth.toDestination();

export default synth;
