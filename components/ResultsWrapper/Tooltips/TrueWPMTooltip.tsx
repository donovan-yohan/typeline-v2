import { useGlobalStyles } from "../../../styles/globals.style";

export const TrueWPMTooltip = () => {
  const { classes: global } = useGlobalStyles();

  return (
    <div className={global.tooltipBody}>
      <div>
        This is your{" "}
        <span className={global.highlight}>
          <b>average words per minute</b>
        </span>
        , but lowered for every{" "}
        <span className={global.incorrect}>
          <b>error</b>
        </span>{" "}
        left uncorrected.
      </div>
      <div>
        <code>[correct - (errors - corrected)] / test time</code>
      </div>
    </div>
  );
};
