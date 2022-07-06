import { createStyles } from "@mantine/core";
import { rem } from "../../utils/styles/css.utils";
import { TypingWrapperStyleProps } from "./TypingWrapper.definition";

export const useTypingWrapperStyles = createStyles(
  (theme, { scroll }: TypingWrapperStyleProps) => {
    const tc = theme.other.typingConfig;
    return {
      scrollArea: {
        marginTop: 128,
        height: rem((tc.lineHeight * tc.fontSize + tc.lineSpacing) * tc.linesVisible),
        overflow: `${scroll ? "scroll" : "hidden"} !important`
      }
    };
  }
);
