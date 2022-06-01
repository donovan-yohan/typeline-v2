import { atom } from "jotai";
import { EmptyOffsetType } from "../../../hooks/useOffset";
import { LetterOffsetTuple } from "../TypingOutput.definition";

export const letterOffsetAtom = atom<LetterOffsetTuple>({
  offset: EmptyOffsetType,
  isLast: false
});
