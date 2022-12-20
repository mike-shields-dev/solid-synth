import { createSignal } from "solid-js";
import styles from "./App.module.css";
import QwertyKeyEventManager from "./components/QwertyKeyEventManager";
import MIDIEventManager from "./components/MIDIEventManager";
import KeyboardUI from "./components/KeyboardUI";
import OscillatorUI from "./components/Oscillator";
import Filter from "./components/Filter";
import synth from "./Synth";

const [octave, setOctave] = createSignal(synth.octave);

function App() {
  return (
    <div class={styles.App}>
      <OscillatorUI />
      <Filter />
      <KeyboardUI />
      <MIDIEventManager />
      <QwertyKeyEventManager setOctave={setOctave} />
    </div>
  );
}

export default App;
