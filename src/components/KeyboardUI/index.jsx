import { onMount } from "solid-js";
import css from "./style.module.css";
import synth from "../../Synth";

const keyboardWidth = 100;
const numMajorKeys = 7;
const keyWidth = keyboardWidth / numMajorKeys;

const keys = [
  { leftOffset: 0, dataIndex: 0, className: "MajorKey" },
  { leftOffset: 1, dataIndex: 2, className: "MajorKey" },
  { leftOffset: 2, dataIndex: 4, className: "MajorKey" },
  { leftOffset: 3, dataIndex: 5, className: "MajorKey" },
  { leftOffset: 4, dataIndex: 7, className: "MajorKey" },
  { leftOffset: 5, dataIndex: 9, className: "MajorKey" },
  { leftOffset: 6, dataIndex: 11, className: "MajorKey" },
  { leftOffset: 0.75, dataIndex: 1, className: "MinorKey" },
  { leftOffset: 1.75, dataIndex: 3, className: "MinorKey" },
  { leftOffset: 3.75, dataIndex: 6, className: "MinorKey" },
  { leftOffset: 4.75, dataIndex: 8, className: "MinorKey" },
  { leftOffset: 5.75, dataIndex: 10, className: "MinorKey" },
];

function Keyboard(props) {
  onMount(() => {
    const keyboardEl = document.querySelector(`[class*="Keyboard"]`);
    keyboardEl.style.setProperty(
      "--key-width",
      `calc(${keyboardWidth}% / ${numMajorKeys})`
    );
  });

  const noteEvent = (e) => {
    const noteNumber =
      +e.target.dataset.index + props.octave() * props.octaveSize;
    const isNoteOff = ["mouseup", "mouseleave"].includes(e.type);
    const isNoteOn = e.type === "mousedown";

    props.setNotes((prevNotes) =>
      prevNotes.map((prevNote, i) => {
        if (noteNumber === i) {
          if (isNoteOn && !prevNote.isActive) {
            synth.triggerAttack(prevNote.freq);
            return { ...prevNote, isActive: true };
          }
          if (isNoteOff && prevNote.isActive) {
            synth.triggerRelease(prevNote.freq);
            return { ...prevNote, isActive: false };
          }
        }
        return prevNote;
      })
    );
  };

  return (
    <div class={css.Keyboard}>
      <For each={keys}>
        {(key) => (
          <button
            class={css[key.className]}
            data-index={key.dataIndex}
            onMouseDown={noteEvent}
            onMouseLeave={noteEvent}
            onMouseUp={noteEvent}
            style={{ left: `${keyWidth * key.leftOffset}%` }}
          />
        )}
      </For>
    </div>
  );
}

export default Keyboard;
