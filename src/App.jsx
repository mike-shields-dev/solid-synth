import { createSignal, For, onCleanup, onMount } from "solid-js";
import styles from "./App.module.css";
import * as Tone from "tone";
import midiNotes from "./utils/midiNotes";
import OctaveSpinbutton from "./components/OctaveSpinbutton";
import QwertyKeyEventManager from "./components/QwertyKeyEventManager";
import MIDIEventManager from "./components/MIDIEventManager";
import KeyboardUI from "./components/KeyboardUI";

const octaveInit = 4;
const octaveMin = 0;
const octaveMax = 10;
const octaveSize = 12;
const polySynth = new Tone.PolySynth(Tone.FMSynth);
polySynth.toDestination();

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
        polySynth={polySynth}
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
      <KeyboardUI
        octave={octave}
        octaveSize={octaveSize}
        polySynth={polySynth}
        setNotes={setNotes}
      />

      <For each={midiInputs()}>
        {(midiInput) => <div>{midiInput.name}</div>}
      </For>
    </div>
  );
}

export default App;
