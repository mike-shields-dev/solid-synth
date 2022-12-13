import { WebMidi } from "webmidi";
WebMidi.enable()
  .then(() => {
    console.log("WebMidi is enabled");
    WebMidi.inputs.forEach((input) =>
      console.log(input.manufacturer, input.name)
    );
  })
  .catch((e) => console.log(e));

function MIDIEventManager() {
  return null;
}

export default MIDIEventManager;
