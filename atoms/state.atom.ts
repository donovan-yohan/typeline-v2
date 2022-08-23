import { atom } from "jotai";
import { MutableRefObject } from "react";
import { KeypressType } from "../interfaces/typeline";
import { WordGenerator } from "../utils/wordGenerator/wordGenerator";

export const keypressAtom = atom<KeypressType[]>([]);
export const wordGeneratorAtom = atom<WordGenerator>(new WordGenerator("a"));

// typing state
export const isRunningAtom = atom<boolean>(false);
export const isFinishedAtom = atom<boolean>(false);

export const inputRefAtom = atom<MutableRefObject<HTMLInputElement | null> | null>(null);
