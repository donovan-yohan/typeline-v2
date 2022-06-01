import { keyframes } from "@mantine/core";

export const blink = keyframes({
  "0%": {
    opacity: 1
  },
  "50%": {
    opacity: 0
  },
  "100%": {
    opacity: 1
  }
});

export const springWiggle = keyframes({
  "0%": {
    transform: "translateX(-0.1em);"
  },
  "25%": {
    transform: "translateX(0.08em);"
  },
  "50%": {
    transform: "translateX(-0.06em);"
  },
  "75%": {
    transform: "translateX(0.03em);"
  },
  "100%": {
    transform: "translateX(0);"
  }
});


export const wordBounce = keyframes({
  "0%": {
    transform: "translateY(0)"
  },
  "100%": {
    transform: "translateY(-0.2em)"
  }
});