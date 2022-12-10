import "solid-testing-library";
import noteIndexFromChar from "../utils/noteIndexFromChar";

const validChars = [
  "A",
  "W",
  "S",
  "E",
  "D",
  "F",
  "T",
  "G",
  "Y",
  "H",
  "U",
  "J",
  "K",
  "O",
  "L",
  "P",
];

describe("noteIndexFromChar", () => {
  it(`returns a note index between 0 - 15 
        when passed a valid uppercase character, 
        on a qwerty keyboard`, () => {
    validChars.forEach((char, i) => {
      expect(noteIndexFromChar(char)).toEqual(i);
    });
  });
});
