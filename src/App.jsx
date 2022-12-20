import { createSignal, createEffect, For } from "solid-js";
import styles from "./App.module.css";
import midiNotes from "./utils/midiNotes";
import OctaveSpinbutton from "./components/OctaveSpinbutton";
import QwertyKeyEventManager from "./components/QwertyKeyEventManager";
import MIDIEventManager from "./components/MIDIEventManager";
import KeyboardUI from "./components/KeyboardUI";
import OscillatorUI from "./components/Oscillator";
import synth from "./Synth";

const [octave, setOctave] = createSignal(synth.octave);

function App() {
  return (
    <div class={styles.App}>
      <OctaveSpinbutton octave={octave()} setOctave={setOctave} />
      <OscillatorUI />
      <KeyboardUI />
      <MIDIEventManager />
      <QwertyKeyEventManager setOctave={setOctave}  />
    </div>
  );
}

export default App;
