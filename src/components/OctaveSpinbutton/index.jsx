import killUIEvent from "../../utils/killUIEvent";
import synth from "../../Synth";

function OctaveSpinbutton(props) {
  function onOctave(e) {
    if(e.type === "keyup" && !["ArrowUp", "ArrowDown"].includes(e.key)) return;
    let adjustment;
    if (e.key === "ArrowUp") adjustment = 1;
    if (e.key === "ArrowDown") adjustment = -1;

    let newOctave;
    if (e.type === "change") newOctave = +e.target.value;
    else newOctave = props.octave + adjustment;

    if (newOctave < synth.octaveMin || newOctave > synth.octaveMax) return;

    synth.releaseAll();
    props.setOctave(newOctave);
  }

  return (
    <>
      <label for="octave">Octave: </label>
      <input
        id="octave"
        name="octave"
        max={synth.octaveMax}
        min={synth.octaveMin}
        onchange={onOctave}
        onkeydown={killUIEvent}
        onkeypress={killUIEvent}
        onkeyup={onOctave}
        oninput={killUIEvent}
        value={props.octave}
        type="number"
      />
    </>
  );
}

export default OctaveSpinbutton;
