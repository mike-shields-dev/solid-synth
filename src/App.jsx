import { createSignal, onCleanup, onMount } from "solid-js";
import styles from "./App.module.css";
import * as Tone from "tone";
import midiNotes from "./utils/midiNotes";
import OctaveSpinbutton from "./components/OctaveSpinbutton";
import QwertyKeyEventManager from "./components/QwertyKeyEventManager";
import MIDIEventManager from "./components/MIDIEventManager";

const octaveInit = 4;
const octaveMin = 0;
const octaveMax = 10;
const octaveSize = 12;
const polySynth = new Tone.PolySynth(Tone.FMSynth);
polySynth.toDestination();

const [octave, setOctave] = createSignal(octaveInit);
const [notes, setNotes] = createSignal(midiNotes);

function App() {
  return (
    <div class={styles.App}>
      <MIDIEventManager />
      <QwertyKeyEventManager
        notes={notes()}
        octave={octave()}
        octaveMin={octaveMin}
        octaveMax={octaveMax}
        octaveSize={octaveSize}
        polySynth={polySynth}
        setOctave={setOctave}
        setNotes={setNotes}
      />
      <OctaveSpinbutton
        octaveMax={octaveMax}
        octaveMin={octaveMin}
        polySynth={polySynth}
        setOctave={setOctave}
        octave={octave}
      />
    </div>
  );
}

export default App;
