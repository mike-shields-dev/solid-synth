import { Gain } from "tone";

class MasterGain {
  constructor() {
      this._gain = {
        min: 0,
        max: 0.6,
        value: 0.2,
      };
    this.node = new Gain(this._gain.value);
  }

  get gain() {
    return this._gain;
  }

  set gain(value) {
    if (
      typeof value !== "number" ||
      value < this._gain.min ||
      value > this._gain.max
    )
      throw new Error(
        `gain value: ${value} is outside range ${
          (this._gain.min, this._gain.max)
        }`
      );

    this._gain.value = value;
    this.node.gain.rampTo(value, 0.0001);
  }
}

const masterGain = new MasterGain();
masterGain.node.toDestination();

export { masterGain };
