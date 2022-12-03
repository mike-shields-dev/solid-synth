import styles from "./App.module.css";
import { PolySynth } from "tone";


const polySynth = new PolySynth().toDestination();

function App() {

  return (
    <div class={styles.App} 
      <button
        onMouseDown={() => polySynth.triggerAttack(["C4"])}
        onMouseUp={() => polySynth.triggerRelease(["C4"])}
      >
        play note
      </button>
    </div>
  );
}

export default App;
