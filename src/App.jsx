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

const minTransposition = 0;
const maxTransposition = 120;
const transpositionIncrement = 12;
const polySynth = new Tone.PolySynth(Tone.FMSynth);
polySynth.toDestination();

function App() {
  const [transposition, setTransposition] = createSignal(0);
  const [notes, setNotes] = createSignal(midiNotes);

  function addQwertyKeyEventListeners() {
    window.addEventListener("keydown", handleQwertyKeyEvents);
    window.addEventListener("keyup", handleQwertyKeyEvents);
  }

  function removeQwertyKeyEventListeners() {
    window.removeEventListener("keydown", handleQwertyKeyEvents);
    window.removeEventListener("keyup", handleQwertyKeyEvents);
  }

  onMount(() => addQwertyKeyEventListeners());
  onCleanup(() => removeQwertyKeyEventListeners());

  function handleQwertyKeyEvents(e) {
    if (!e.getModifierState("CapsLock")) return;

    if (["Z", "X"].includes(e.key) && e.type === "keyup") {
      handleQwertyTransposeEvents(e);
    } else {
      handleQwertyNoteEvents(e);
    }
  }

  function handleQwertyTransposeEvents(e) {
    notes().forEach(
      (note) => note.isActive && polySynth.triggerRelease(note.freq)
    );

    return setTransposition((prevTransposition) => {
      let newTransposition;

      if (e.key === "Z") newTransposition = prevTransposition - transpositionIncrement;
      if (e.key === "X") newTransposition = prevTransposition + transpositionIncrement;
      if (
        newTransposition >= minTransposition &&
        newTransposition <= maxTransposition
      ) {
        return newTransposition;
      } else {
        return prevTransposition;
      }
    });
  }

  function handleQwertyNoteEvents(e) {
    const qwertyKeyIndex = qwertyKeyIndexFromChar(e.key);
    if (typeof qwertyKeyIndex !== "number") return;

    const noteNumber = qwertyKeyIndex + transposition();
    if (!notes()[noteNumber]) return;

    let isActive;

    if (e.type === "keydown") isActive = true;
    if (e.type === "keyup") isActive = false;

    return updateNotes(noteNumber, isActive);
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

  return (
    <div class={styles.App}>
      <div>{transposition()}</div>
    </div>
  );
}

export default App;
