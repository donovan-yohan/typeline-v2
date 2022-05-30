import { atom } from "jotai";
import { KeypressType } from "../interfaces/typeline";
import { WordGenerator } from "../utils/wordGenerator/wordGenerator";

export const keypressAtom = atom<KeypressType[]>([]);
export const wordGeneratorAtom = atom<WordGenerator>(new WordGenerator("a"));
