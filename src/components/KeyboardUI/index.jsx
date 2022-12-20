import { createEffect, createSignal, onMount } from "solid-js";
import css from "./style.module.css";
import synth from "../../Synth";
import OctaveSpinbutton from "../OctaveSpinbutton";

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

const Keyboard = () => {
  const [octave, setOctave] = createSignal(synth.octave);

  onMount(() => {
    const keyboardEl = document.querySelector(`[class*="Keyboard"]`);
    keyboardEl.style.setProperty(
      "--key-width",
      `calc(${keyboardWidth}% / ${numMajorKeys})`
    );
  });

  const onNote = (e) => {
    const noteNumber =
      +e.target.dataset.index + octave() * synth.notesPerOctave;
    if (noteNumber < 0 || noteNumber > synth.voices.length || e.button !== 0)
      return;

    let isActive;
    if (e.type === "mousedown") isActive = true;
    if (["mouseup", "mouseleave"].includes(e.type)) {
      isActive = false;
    }

    synth.onNoteEvent({ noteNumber, isActive });
  };

  return (
    <>
      <OctaveSpinbutton octave={octave()} setOctave={setOctave} />
      <div class={css.Keyboard}>
        <For each={keys}>
          {(key) => {
            return (
              <button
                class={css[key.className]}
                data-index={key.dataIndex}
                onMouseDown={onNote}
                onMouseLeave={onNote}
                onMouseUp={onNote}
                style={{ left: `${keyWidth * key.leftOffset}%` }}
              />
            );
          }}
        </For>
      </div>
    </>
  );
};

export default Keyboard;
