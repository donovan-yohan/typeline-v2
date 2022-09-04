import { TooltipProps } from "@mantine/core";

export const TooltipStyle: Partial<TooltipProps> = {
  multiline: true,
  width: 300,
  radius: "xs",
  withArrow: true,
  transition: "fade",
  transitionDuration: 200,
  zIndex: 9999,
};
