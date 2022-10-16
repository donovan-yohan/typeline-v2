import { useGlobalStyles } from "../../../../../styles/globals.style";
import { HistoryTooltipProps } from "./HistoryTooltip.definition";

export const HistoryTooltip = (props: HistoryTooltipProps) => {
  const { keypresses } = props;
  const { classes: global } = useGlobalStyles();

  return (
    // TODO: Show how long it took to type a word
    // TODO: Show how many visits to a word
    // highlight errors/typos for corrected words

    <div className={global.tooltipBody}>{keypresses.map((k) => k.key).join("")}</div>
  );
};
