import killUIEvent from "../../utils/killUIEvent";

function OctaveSpinbutton(props) {
  function onOctaveChange(e) {
    if (!["ArrowUp", "ArrowDown"].includes(e.key)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    ) {
      killUIEvent(e);
    }
    props.setOctave((prevOctave) => {
      let newOctave;
      if (e.key === "ArrowUp") newOctave = prevOctave + 1;
      if (e.key === "ArrowDown") newOctave = prevOctave - 1;
      if (newOctave >= props.octaveMin && newOctave <= props.octaveMax) {
        return newOctave;
      } else {
        killUIEvent(e);
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
        octaveMax={props.octaveMax}
        octaveMin={props.octaveMin}
        onchange={onOctaveChange}
        onkeydown={killUIEvent}
        onkeypress={killUIEvent}
        onkeyup={onOctaveChange}
        value={props.value}
        type="number"
      />
    </>
  );
}

export default OctaveSpinbutton;
