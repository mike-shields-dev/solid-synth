import "solid-testing-library";
import qwertyKeyIndexFromChar from "../utils/qwertyKeyIndexFromChar";

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

describe("qwertyKeyIndexFromChar", () => {
  it(`returns a note index between 0 - 15 
        when passed a valid uppercase character, 
        on a qwerty keyboard`, () => {
    validChars.forEach((char, i) => {
      expect(qwertyKeyIndexFromChar(char)).toEqual(i);
    });
  });
});
