const precision = 1000;

const freqFromMidiNoteNumber = (num) => 440 * Math.pow(2, (num - 69) / 12);

const roundNum = (num, precision) =>
  Math.round((num + Number.EPSILON) * precision) / precision;

const midiNotes = new Array(128).fill(null).map((_, i) => {
  return {
    freq: roundNum(freqFromMidiNoteNumber(i), precision),
    isActive: false,
  };
});

export default midiNotes;
