import { createSignal } from "solid-js";
import synth from "../../Synth/index";

function OscillatorUI() {
  const [selectedWaveform, setSelectedWaveform] = createSignal(synth.waveform);

  const onChange = ({ target: { value: waveform } }) => {
    synth.waveform = waveform;
    setSelectedWaveform(synth.waveform);
  };

  return (
    <fieldset>
      <legend>Waveform</legend>
      <For each={synth.validWaveforms}>
        {(validWaveform) => (
          <div>
            <input
              type="radio"
              id={validWaveform}
              name="waveform"
              value={validWaveform}
              onChange={onChange}
              checked={selectedWaveform() === validWaveform}
            />
            <label for={validWaveform}>{validWaveform}</label>
          </div>
        )}
      </For>
    </fieldset>
  );
}

export default OscillatorUI;
