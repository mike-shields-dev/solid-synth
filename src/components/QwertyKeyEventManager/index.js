import { onMount, onCleanup } from "solid-js";
import qwertyKeyIndexFromChar from "../../utils/qwertyKeyIndexFromChar";
import synth from "../../Synth";

const QwertyKeyEventManager = (props) => {
  onMount(() => {
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("keyup", onKey);
  });

  const onKey = (e) => {
    if (!e.getModifierState("CapsLock")) return;
    if (["Z", "X"].includes(e.key) && e.type === "keyup") {
      onOctave(e);
    } else {
      onNote(e);
    }
  };

  const onOctave = (e) => {
    let adjustment;
    if (e.key === "Z") adjustment = -1;
    if (e.key === "X") adjustment = 1;

    const newOctave = synth.octave + adjustment;
    if (
      newOctave === synth.octave ||
      newOctave < synth.octaveMin ||
      newOctave > synth.octaveMax
    )
      return;

    synth.octave = newOctave;
    props.setOctave(synth.octave);
  };

  const onNote = (e) => {
    if (e.repeat) return;
    const qwertyKeyIndex = qwertyKeyIndexFromChar(e.key);
    if (typeof qwertyKeyIndex !== "number") return;

    const noteNumber = qwertyKeyIndex + synth.noteOffset;
    let isActive;
    if (e.type === "keydown") isActive = true;
    if (e.type === "keyup") isActive = false;

    if (!synth.notes[noteNumber]) return;

    synth.updateNotes({ noteNumber, isActive });
  };
};

export default QwertyKeyEventManager;
