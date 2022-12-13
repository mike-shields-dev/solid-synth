import { onMount, onCleanup } from "solid-js";
import { WebMidi } from "webmidi";

function MIDIEventManager(props) {
  onMount(() => {
    WebMidi.enable()
      .then(() => {
        console.log(WebMidi.inputs)
        props.setMidiInputs(WebMidi.inputs);
      })
      .catch((e) => console.log(e));
  });

  onCleanup(() => WebMidi.disable());
  return null;
}

export default MIDIEventManager;
