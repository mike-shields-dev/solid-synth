import styles from "./App.module.css";
import QwertyKeyEventManager from "./components/QwertyKeyEventManager";
import MIDIEventManager from "./components/MIDIEventManager";
import KeyboardUI from "./components/KeyboardUI";
import OscillatorUI from "./components/Oscillator";
import MasterGain from "./components/MasterGain";

function App() {
  return (
    <div class={styles.App}>
      <OscillatorUI />
      <MasterGain />
      <KeyboardUI />
      <MIDIEventManager />
      <QwertyKeyEventManager />
    </div>
  );
}

export default App;
