import { onMount, onCleanup } from "solid-js";
import qwertyKeyIndexFromChar from "../../utils/qwertyKeyIndexFromChar";

function QwertyKeyEventManager(props) {
  onMount(() => {
    window.addEventListener("keydown", onKey);
    window.addEventListener("keyup", onKey);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", onKey);
    window.removeEventListener("keyup", onKey);
  });

  function onKey(e) {
    if (!e.getModifierState("CapsLock")) return;
    if (["Z", "X"].includes(e.key) && e.type === "keyup") {
      onOctave(e);
    } else {
      onNote(e);
    }
  }

  function onOctave(e) {
    props.setOctave((prevOctave) => {
      let newOctave;

      if (e.key === "Z") newOctave = prevOctave - 1;
      if (e.key === "X") newOctave = prevOctave + 1;
      
      if (newOctave < props.octaveMin || newOctave > props.octaveMax) {
        return prevOctave;
      } else {
        props.polySynth.releaseAll();
        return newOctave;
      }
    });
  }

  function onNote(e) {
    const qwertyKeyIndex = qwertyKeyIndexFromChar(e.key);
    if (typeof qwertyKeyIndex !== "number") return;

    const noteNumber = qwertyKeyIndex + props.octave * props.octaveSize;
    if (!props.notes[noteNumber]) return;

    let isActive;
    if (e.type === "keydown") isActive = true;
    if (e.type === "keyup") isActive = false;

    props.setNotes((prevNotes) =>
      prevNotes.map((prevNote, i) => {
        if (noteNumber === i && isActive !== prevNote.isActive) {
          props.polySynth[isActive ? "triggerAttack" : "triggerRelease"](
            prevNote.freq
          );
          return { ...prevNote, isActive };
        } else {
          return prevNote;
        }
      })
    );
  }
}

export default QwertyKeyEventManager;
