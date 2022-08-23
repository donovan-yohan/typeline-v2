import { atom } from "jotai";
import React from "react";
import { EmptyOffsetType, OffsetType } from "../../../../hooks/useOffset";

export const currentHistoryWordRefAtom =
  atom<React.MutableRefObject<HTMLSpanElement | null> | null>(null);
export const historyWordOffsetAtom = atom<OffsetType>(EmptyOffsetType);
