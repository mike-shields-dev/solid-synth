import { createSignal } from "solid-js";
import { masterGain } from "../../AudioAPI/MasterGain";

function MasterGain() {
  const [gain, setGain] = createSignal(masterGain.gain);

  const onGain = (e) => {
    masterGain.gain = +e.target.value;
    setGain(masterGain);
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
        min={masterGain.gain.min}
        max={masterGain.gain.max}
        step={0.01}
      />
    </div>
  );
}

export default MasterGain;
