import css from "./style.module.css";

function Keyboard(props) {
  const keyWidth = 100 / 7;

  const noteEvent = (e) => {
    const noteNumber =
      +e.target.dataset.index + props.octave() * props.octaveSize;
    const isNoteOff = ["mouseup", "mouseleave"].includes(e.type);
    const isNoteOn = e.type === "mousedown";

    props.setNotes((prevNotes) =>
      prevNotes.map((prevNote, i) => {
        if (noteNumber === i) {
          if (isNoteOn && !prevNote.isActive) {
            props.polySynth.triggerAttack(prevNote.freq);
            return { ...prevNote, isActive: true };
          }
          if (isNoteOff && prevNote.isActive) {
            props.polySynth.triggerRelease(prevNote.freq);
            return { ...prevNote, isActive: false };
          }
        }
        return prevNote;
      })
    );
  };

  return (
    <svg class={css.Keyboard}>
      <g class={css.MajorKeys}>
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="0"
          class={css.MajorKey}
          x={`${keyWidth * 0}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="2"
          class={css.MajorKey}
          x={`${keyWidth * 1}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="4"
          class={css.MajorKey}
          x={`${keyWidth * 2}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="5"
          class={css.MajorKey}
          x={`${keyWidth * 3}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="7"
          class={css.MajorKey}
          x={`${keyWidth * 4}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="9"
          class={css.MajorKey}
          x={`${keyWidth * 5}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="11"
          class={css.MajorKey}
          x={`${keyWidth * 6}%`}
        />
      </g>
      <g class={css.MinorKeys}>
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="1"
          class={css.MinorKey}
          x={`${keyWidth * 0.75}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="3"
          class={css.MinorKey}
          x={`${keyWidth * 1.75}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="6"
          class={css.MinorKey}
          x={`${keyWidth * 3.75}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="8"
          class={css.MinorKey}
          x={`${keyWidth * 4.75}%`}
        />
        <rect
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="10"
          class={css.MinorKey}
          x={`${keyWidth * 5.75}%`}
        />
      </g>
    </svg>
  );
}

export default Keyboard;
