import { atom } from "jotai";
import { MutableRefObject } from "react";
import { KeypressType } from "../interfaces/typeline";
import { WordGenerator } from "../utils/wordGenerator/wordGenerator";
import { DEFAULT_TIME } from "../utils/wordGenerator/wordGenerator.config";

export const keypressAtom = atom<KeypressType[]>([]);
export const expectedAtom = atom<string[]>([]);
export const wordGeneratorAtom = atom<WordGenerator>(new WordGenerator("a"));

// typing state
export const totalTimeAtom = atom<number>(DEFAULT_TIME);
export const isRunningAtom = atom<boolean>(false);
export const isFinishedAtom = atom<boolean>(false);

export const inputRefAtom = atom<MutableRefObject<HTMLInputElement | null> | null>(null);
