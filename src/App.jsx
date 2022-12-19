import { createSignal, For } from "solid-js";
import styles from "./App.module.css";
import midiNotes from "./utils/midiNotes";
import OctaveSpinbutton from "./components/OctaveSpinbutton";
import QwertyKeyEventManager from "./components/QwertyKeyEventManager";
import MIDIEventManager from "./components/MIDIEventManager";
import KeyboardUI from "./components/KeyboardUI";
import OscillatorUI from "./components/Oscillator";

const octaveInit = 4;
const octaveMin = 0;
const octaveMax = 10;
const octaveSize = 12;

const [octave, setOctave] = createSignal(octaveInit);
const [notes, setNotes] = createSignal(midiNotes);
const [midiInputs, setMidiInputs] = createSignal([]);

function App() {
  return (
    <div class={styles.App}>
      <MIDIEventManager
        notes={notes()}
        octave={octave()}
        octaveMax={octaveMax}
        octaveMin={octaveMin}
        octaveSize={octaveSize}
        setMidiInputs={setMidiInputs}
        setOctave={setOctave}
        setNotes={setNotes}
      />
      <QwertyKeyEventManager
        notes={notes()}
        octave={octave()}
        octaveMax={octaveMax}
        octaveMin={octaveMin}
        octaveSize={octaveSize}
        setOctave={setOctave}
        setNotes={setNotes}
      />
      <OctaveSpinbutton
        octaveMax={octaveMax}
        octaveMin={octaveMin}
        setOctave={setOctave}
        octave={octave}
      />
      <OscillatorUI />
      <KeyboardUI
        octave={octave}
        octaveSize={octaveSize}
        setNotes={setNotes}
      />

      <For each={midiInputs()}>
        {(midiInput) => <div>{midiInput.name}</div>}
      </For>
    </div>
  );
}

export default App;
