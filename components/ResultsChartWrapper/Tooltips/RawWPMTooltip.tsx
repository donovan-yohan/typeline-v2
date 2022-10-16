import { useGlobalStyles } from "../../../styles/globals.style";

export const RawWPMTooltip = () => {
  const { classes: global } = useGlobalStyles();

  return (
    <div className={global.tooltipBody}>
      <div>
        This is your <b>raw average words per minute</b>, calculated using <b>correct</b>{" "}
        keystrokes.
      </div>
      <div>
        <code>correct / test time</code>
      </div>
      <div>
        In brackets is the same, but also includes{" "}
        <span className={global.incorrect}>
          <b>error</b>
        </span>{" "}
        keystrokes.
      </div>
      <div>
        <code>(correct + errors) / test time</code>
      </div>
    </div>
  );
};
