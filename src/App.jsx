import { createSignal, onCleanup, onMount } from "solid-js";
import styles from "./App.module.css";
import { WebMidi } from "webmidi";
import * as Tone from "tone";
import qwertyKeyIndexFromChar from "./utils/qwertyKeyIndexFromChar";
import midiNotes from "./utils/midiNotes";

WebMidi.enable()
  .then(() => {
    console.log("WebMidi is enabled");
    WebMidi.inputs.forEach((input) =>
      console.log(input.manufacturer, input.name)
    );
  })
  .catch((e) => console.log(e));

const octaveInit = 4;
const octaveMin = 0;
const octaveMax = 10;
const octaveSize = 12;
const polySynth = new Tone.PolySynth(Tone.FMSynth);
polySynth.toDestination();

function App() {
  const [octave, setOctave] = createSignal(octaveInit);
  const [notes, setNotes] = createSignal(midiNotes);

  onMount(() => {
    window.removeEventListener("keydown", onQwertyKeys);
    window.removeEventListener("keyup", onQwertyKeys);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", onQwertyKeys);
    window.removeEventListener("keyup", onQwertyKeys);
  });

  function onQwertyKeys(e) {
    if (!e.getModifierState("CapsLock")) return;
    if (["Z", "X"].includes(e.key) && e.type === "keyup") {
      onQwertyOctave(e);
    } else {
      onQwertyNote(e);
    }
  }

  function onQwertyOctave(e) {
    polySynth.releaseAll();
    setOctave((prevOctave) => {
      let newOctave;
      if (e.key === "Z") newOctave = prevOctave - 1;
      if (e.key === "X") newOctave = prevOctave + 1;
      return newOctave < octaveMin || newOctave > octaveMax
        ? prevOctave
        : newOctave;
    });
  }

  function onQwertyNote(e) {
    const qwertyKeyIndex = qwertyKeyIndexFromChar(e.key);
    if (typeof qwertyKeyIndex !== "number") return;
    const noteNumber = qwertyKeyIndex + octave() * octaveSize;
    if (!notes()[noteNumber]) return;
    let isActive;
    if (e.type === "keydown") isActive = true;
    if (e.type === "keyup") isActive = false;
    updateNotes(noteNumber, isActive);
  }

  function updateNotes(noteNumber, isActive) {
    setNotes((prevNotes) =>
      prevNotes.map((prevNote, i) => {
        if (noteNumber === i && isActive !== prevNote.isActive) {
          polySynth[isActive ? "triggerAttack" : "triggerRelease"](
            notes()[noteNumber].freq
          );
          return { ...prevNote, isActive };
        }
        return prevNote;
      })
    );
  }

  function killUIEvent(e) {
    e.stopImmediatePropagation();
    e.preventDefault();
  }

  return (
    <div class={styles.App}>
      <label for="octave">Octave: </label>
      <input
        id="octave"
        type="number"
        max={octaveMax}
        min={octaveMin}
        onchange={onQwertyOctave}
        onkeyup={killUIEvent}
        onkeydown={killUIEvent}
        onkeypress={killUIEvent}
        value={octave()}
      />
    </div>
  );
}

export default App;
