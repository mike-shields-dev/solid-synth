import "solid-testing-library";
import midiNoteNamesArr from "../utils/midiNoteNamesArr";

describe("midiNoteNames", () => {
  it("each note name should be a string", () => {
    midiNoteNamesArr.forEach((noteName) => {
      expect(typeof noteName).toEqual("string");
    });
  });

  it("each note name should be unique", () => {
    const midiNoteNamesSet = new Set([...midiNoteNamesArr]);
    expect(midiNoteNamesArr.length).toEqual(midiNoteNamesSet.size);
  });

  it("note names should only begin with the chars C, D, E, F, G, A, B", () => {
    midiNoteNamesArr.forEach((noteName) => {
      expect(
        ["C", "D", "E", "F", "G", "A", "B"].includes(noteName[0])
      ).toBeTruthy();
    });
  });

  it("note names should end with an integer", () => {
    midiNoteNamesArr.forEach((noteName) => {
      expect(Number.isNaN(noteName.at(-1))).not.toBeTruthy();
    });
  });
});
