import { atom } from "jotai";
import { EmptyOffsetType, OffsetType } from "../../hooks/useOffset";
import { LetterOffsetTuple } from "./TypingOutput.definition";

export const wordOffsetAtom = atom<OffsetType>(EmptyOffsetType);
export const letterOffsetAtom = atom<LetterOffsetTuple>({
  offset: EmptyOffsetType,
  isLast: false
});
export const currentWordCorrectAtom = atom<boolean>(true);
