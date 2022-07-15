import { createStyles } from "@mantine/core";
import { rem } from "../../utils/styles/css.utils";
import { TypingWrapperStyleProps } from "./TypingWrapper.definition";

export const useTypingWrapperStyles = createStyles(
  (theme, { scroll }: TypingWrapperStyleProps) => {
    const tc = theme.other.typingConfig;
    const typingHeight = rem(
      (tc.lineHeight * tc.fontSize + tc.lineSpacing) * tc.linesVisible
    );

    return {
      scrollArea: {
        width: "100%",
        minWidth: "100%",
        marginTop: 128,
        height: typingHeight,
        overflow: `${scroll ? "scroll" : "hidden"} !important`,
        transition: "height 0.33s ease-in-out, width 0.33s ease-in-out"
      }
    };
  }
);
