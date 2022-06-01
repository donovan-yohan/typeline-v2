import { atom } from "jotai";
import React from "react";
import { EmptyOffsetType, OffsetType } from "../../../hooks/useOffset";

export const currentWordRefAtom =
  atom<React.MutableRefObject<HTMLSpanElement | null> | null>(null);
export const wordOffsetAtom = atom<OffsetType>(EmptyOffsetType);
export const currentWordCorrectAtom = atom<boolean>(true);
