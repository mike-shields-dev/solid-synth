import { createSignal } from "solid-js";
import synth from "../../Synth";

function MasterGain() {
  const [gain, setGain] = createSignal(synth.masterGain);

  console.log(gain());
  const onGain = (e) => {
    synth.masterGain = +e.target.value;
    setGain(synth.masterGain);
  };

  return (
    <div>
      <label for="master-gain">Master Gain: </label>
      <input
        type="range"
        id="master-gain"
        name="master-gain"
        value={gain()}
        oninput={onGain}
        min={synth.masterGainMin}
        max={synth.masterGainMax}
        step={0.01}
      />
    </div>
  );
}

export default MasterGain;
