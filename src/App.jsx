import styles from "./App.module.css";
import { WebMidi } from "webmidi";
import { PolySynth } from "tone";

WebMidi.enable()
  .then(() => {
    console.log("WebMidi is enabled");
    WebMidi.inputs.forEach((input) =>
      console.log(input.manufacturer, input.name)
    );
  })
  .catch((e) => console.log(e));

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
