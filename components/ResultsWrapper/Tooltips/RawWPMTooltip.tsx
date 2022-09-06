import { useGlobalStyles } from "../../../styles/globals.style";

export const RawWPMTooltip = () => {
  const { classes: global } = useGlobalStyles();

  return (
    <div className={global.tooltipBody}>
      <div>
        This is your <b>raw average words per minute</b>, calculated using both{" "}
        <b>correct</b> and{" "}
        <span className={global.incorrect}>
          <b>error</b>
        </span>{" "}
        keystrokes.
      </div>
      <div>
        <code>(correct + errors) / test time</code>
      </div>
      <div>
        In brackets is the same, but calculated using only <b>correct</b> keystrokes.
      </div>
      <div>
        <code>correct / test time</code>
      </div>
    </div>
  );
};
