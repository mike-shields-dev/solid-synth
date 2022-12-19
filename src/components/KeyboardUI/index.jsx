import { onMount } from "solid-js";
import css from "./style.module.css";
import synth from "../../Synth";

function Keyboard(props) {
  const keyboardWidth = 100;
  const numMajorKeys = 7;
  const keyWidth = keyboardWidth / numMajorKeys;

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
        <button
          class={css.MajorKey}
          data-index="0"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 0}%`}}
        />
        <button
          class={css.MajorKey}
          data-index="2"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 1}%`}}
        />
        <button
          class={css.MajorKey}
          data-index="4"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 2}%`}}
        />
        <button
          class={css.MajorKey}
          data-index="5"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 3}%`}}
        />
        <button
          class={css.MajorKey}
          data-index="7"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 4}%`}}
        />
        <button
          class={css.MajorKey}
          data-index="9"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 5}%`}}
        />
        <button
          class={css.MajorKey}
          data-index="11"
          onMouseDown={noteEvent}
          onMouseLeave={noteEvent}
          onMouseUp={noteEvent}
          style={{left: `${keyWidth * 6}%`}}
        />
        <button        
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="1"
          class={css.MinorKey}
          style={{left: `${keyWidth * 0.75}%`}}
        />
        <button
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="3"
          class={css.MinorKey}
          style={{left: `${keyWidth * 1.75}%`}}
        />
        <button
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="6"
          class={css.MinorKey}
          style={{left: `${keyWidth * 3.75}%`}}
        />
        <button
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="8"
          class={css.MinorKey}
          style={{left: `${keyWidth * 4.75}%`}}
        />
        <button
          onMouseDown={noteEvent}
          onMouseUp={noteEvent}
          onMouseLeave={noteEvent}
          data-index="10"
          class={css.MinorKey}
          style={{left: `${keyWidth * 5.75}%`}}
        />
    </div>
  );
}

export default Keyboard;
