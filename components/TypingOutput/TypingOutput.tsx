import useCounter from "hooks/useCounter";
import useDidUpdateEffect from "hooks/useDidUpdateEffect";
import useIsomorphicLayoutEffect from "hooks/useIsomorphicLayoutEffect";
import { useOffset } from "hooks/useOffset";
import { useSetAtom } from "jotai";
import { wordOffsetAtom } from "pages/test";
import React, { useRef } from "react";
import { LetterProps, WordProps } from "./word.definition";
import { LetterSpan, WordWrapper } from "./word.style";


