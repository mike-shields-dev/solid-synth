import { onMount, onCleanup, createSignal } from "solid-js";
import { WebMidi } from "webmidi";
import synth from "../../Synth";

function MIDIEventManager() {
  const [midiInputs, setMidiInputs] = createSignal([]);
  const [midiOutputs, setMidiOutputs] = createSignal([]);

  const onNoteEvent = (e) => {
    const [statusByte, noteNumber, noteVelocity] = e.data;

    let isActive;
    if (e.type === "noteon") isActive = true;
    if (e.type === "noteoff") isActive = false;

    synth.updateNotes({ noteNumber, isActive });
  };

  const addListener = (midiInput, eventType) =>
    midiInput.addListener(eventType, onNoteEvent);

  const removeListener = (midiInput, eventType) =>
    midiInput.removeListener(eventType, onNoteEvent);

  const addListeners = (midiInputs) =>
    midiInputs.forEach((midiInput) => {
      addListener(midiInput, "noteon");
      addListener(midiInput, "noteoff");
    });

  const removeListeners = (midiInputs) =>
    midiInputs.forEach((midiInput) => {
      removeListener(midiInput, "noteon");
      removeListener(midiInput, "noteoff");
    });

  const updateMidiInsAndOuts = () => {
    setMidiInputs((prevMidiInputs) => {
      removeListeners(prevMidiInputs);
      addListeners(WebMidi.inputs);
      return WebMidi.inputs;
    });
    setMidiOutputs(WebMidi.outputs);
  };

  onMount(async () => {
    try {
      await WebMidi.enable({ sysex: true });
      updateMidiInsAndOuts();
      WebMidi.addListener("connected", updateMidiInsAndOuts);
      WebMidi.addListener("disconnected", updateMidiInsAndOuts);
    } catch (err) {
      console.log(err);
    }
  });

  onCleanup(() => WebMidi.disable());

  return null;
}

export default MIDIEventManager;
