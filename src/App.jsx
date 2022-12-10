import { createSignal, onCleanup, onMount } from "solid-js";
import styles from "./App.module.css";
import { WebMidi } from "webmidi";
import * as Tone from "tone";
import noteIndexFromChar from "./utils/noteIndexFromChar";
import midiNoteNames from "./utils/midiNoteNamesArr";

WebMidi.enable()
  .then(() => {
    console.log("WebMidi is enabled");
    WebMidi.inputs.forEach((input) =>
      console.log(input.manufacturer, input.name)
    );
  })
  .catch((e) => console.log(e));

const polySynth = new Tone.PolySynth(Tone.FMSynth);
polySynth.toDestination();

function App() {
  const [transposition, setTransposition] = createSignal(0);
  const [activeNotes, setActiveNotes] = createSignal([]);

  const handleTransposition = (e) => {
    if (e.type === "keyup") {
      midiNoteNames.forEach((note) => polySynth.triggerRelease([note]));

      return setTransposition((prevTrans) => {
        const transAmount = e.key === "Z" ? -12 : e.key === "X" ? 12 : 0;
        const transResult = prevTrans + transAmount;
        return transResult <= 96 && transResult >= 0 ? transResult : prevTrans;
      });
    }
  };

  const handleNotes = (e) => {
    const noteIndex = noteIndexFromChar(e.key);
    if (noteIndex === false) return;

    const noteName = midiNoteNames[noteIndex + transposition()];

    if (noteName) {
      if (e.type === "keydown" && !activeNotes().includes(noteName)) {
        setActiveNotes((prev) => [...prev, noteName]);
        polySynth.triggerAttack([noteName]);
      }
      if (e.type === "keyup") {
        setActiveNotes(
          activeNotes().filter((activeNote) => activeNote !== noteName)
        );
        polySynth.triggerRelease([noteName]);
      }
    }
  };

  const handleQwertyKeyEvents = (e) => {
    const isNoteMode = e.getModifierState("CapsLock");
    if (isNoteMode) {
      const isTransposeEvent = ["Z", "X"].includes(e.key) && e.type === "keyup";
      if (isTransposeEvent) return handleTransposition(e);
      else handleNotes(e);
    }
  };

  const addQwertyKeyEventListeners = () => {
    window.addEventListener("keydown", handleQwertyKeyEvents);
    window.addEventListener("keyup", handleQwertyKeyEvents);
  };
  const removeQwertyKeyEventListeners = () => {
    window.removeEventListener("keydown", handleQwertyKeyEvents);
    window.removeEventListener("keyup", handleQwertyKeyEvents);
  };

  onMount(() => addQwertyKeyEventListeners());
  onCleanup(() => removeQwertyKeyEventListeners());

  return (
    <div class={styles.App}>
      <div>{transposition()}</div>
      <div
        class={styles.App_notes}
        style={{
          display: "flex",
          gap: "1em",
          margin: "0 auto",
          border: "1px solid red",
          "justify-content": "center",
          "font-size": "0.5rem",
        }}
      >
        {midiNoteNames.map((noteName) => (
          <div
            style={{
              color: `${activeNotes().includes(noteName) ? "black" : "white"}`,
            }}
          >
            {noteName}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
