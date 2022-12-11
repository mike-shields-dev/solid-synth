import killUIEvent from "../../utils/killUIEvent";

function OctaveSpinbutton(props) {
  function onOctave(e) {
    props.setOctave((prevOctave) => {
      let newOctave;
      if (e.key === "ArrowUp") newOctave = prevOctave + 1;
      if (e.key === "ArrowDown") newOctave = prevOctave - 1;
      if (e.type === "change") newOctave = +e.target.value;
      if (newOctave >= props.octaveMin && newOctave <= props.octaveMax) {
        props.polySynth.releaseAll();
        return newOctave;
      } else {
        return prevOctave;
      }
    });
  }

  return (
    <>
      <label for="octave">Octave: </label>
      <input
        id="octave"
        name="octave"
        max={props.octaveMax}
        min={props.octaveMin}
        onchange={onOctave}
        onkeydown={killUIEvent}
        onkeypress={killUIEvent}
        onkeyup={onOctave}
        value={props.octave()}
        type="number"
      />
    </>
  );
}

export default OctaveSpinbutton;
