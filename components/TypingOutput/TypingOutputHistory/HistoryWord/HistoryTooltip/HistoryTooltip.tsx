import { useGlobalStyles } from "../../../../../styles/globals.style";
import { HistoryTooltipProps } from "./HistoryTooltip.definition";

export const HistoryTooltip = (props: HistoryTooltipProps) => {
  const { keypresses } = props;
  const { classes: global } = useGlobalStyles();

  return (
    <div className={global.tooltipBody}>{keypresses.map((k) => k.key).join("")}</div>
  );
};
