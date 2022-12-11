import "solid-testing-library";
import midiNotes from "../utils/midiNotes";

describe("midiNotes", () => {
  it("every isActive prop should be of type boolean, initialised to false", () => {
    midiNotes.every((midiNote) => {
      expect(typeof midiNote.isActive).toEqual("boolean");
      expect(midiNote.isActive).toEqual(false);
    });
  });

  it("each freq prop should be of type number and non-negative", () => {
    midiNotes.forEach((note) => {
      expect(typeof note.freq).toEqual("number");
      expect(note.freq).toBeGreaterThanOrEqual(0);
    });
  });

  it("every freq prop should have a unique value", () => {
    const uniqueFrequencies = new Set(
      midiNotes.map((midiNote) => midiNote.freq)
    );

    expect(uniqueFrequencies.size).toEqual(midiNotes.length);
  });
});
