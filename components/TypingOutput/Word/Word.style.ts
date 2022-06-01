import { createStyles } from "@mantine/core";
import { springWiggle } from "../../../styles/animations.style";
import { rem } from "../../../utils/styles/css.utils";

export const useWordStyles = createStyles((theme) => ({
  word: {
    marginRight: "1rem",
    marginBottom: rem(theme.other.typingConfig.lineSpacing)
  },
  incorrect: {
    animation: `${springWiggle} 0.2s cubic-bezier(0, 0.95, 0.25, 1)`
  }
}));
