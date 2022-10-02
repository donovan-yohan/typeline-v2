import { KeypressType } from "../../interfaces/typeline";
import { BACKSPACE_CHAR, keypressesToKeypressArray } from "../utils";

describe("utils.ts", () => {
  test("keypressesToKeypressArray should split keypresses into respective words", () => {
    const keypresses: KeypressType[] = [
      { key: "h", timestamp: 0 },
      { key: "e", timestamp: 1 },
      { key: "l", timestamp: 2 },
      { key: "l", timestamp: 3 },
      { key: "o", timestamp: 4 },
      { key: " ", timestamp: 5 },
      { key: "w", timestamp: 6 },
      { key: "o", timestamp: 7 },
      { key: "r", timestamp: 8 },
      { key: "l", timestamp: 9 },
      { key: "d", timestamp: 10 },
    ];

    expect(keypressesToKeypressArray(keypresses)).toEqual([
      [
        { key: "h", timestamp: 0 },
        { key: "e", timestamp: 1 },
        { key: "l", timestamp: 2 },
        { key: "l", timestamp: 3 },
        { key: "o", timestamp: 4 },
        { key: " ", timestamp: 5 },
      ],
      [
        { key: "w", timestamp: 6 },
        { key: "o", timestamp: 7 },
        { key: "r", timestamp: 8 },
        { key: "l", timestamp: 9 },
        { key: "d", timestamp: 10 },
      ],
    ]);
  });

  test("keypressesToKeypressArray should maintain integrity even between backspaces and word switches", () => {
    const keypresses: KeypressType[] = [
      { key: "h", timestamp: 0 },
      { key: "e", timestamp: 1 },
      { key: "l", timestamp: 2 },
      { key: "l", timestamp: 3 },
      { key: "p", timestamp: 4 },
      { key: " ", timestamp: 5 },
      { key: "w", timestamp: 6 },
      { key: "o", timestamp: 7 },
      { key: BACKSPACE_CHAR, timestamp: 8 },
      { key: BACKSPACE_CHAR, timestamp: 9 },
      { key: BACKSPACE_CHAR, timestamp: 10 },
      { key: BACKSPACE_CHAR, timestamp: 11 },
      { key: "o", timestamp: 12 },
      { key: " ", timestamp: 13 },
      { key: "w", timestamp: 14 },
      { key: "o", timestamp: 15 },
      { key: "r", timestamp: 16 },
      { key: "l", timestamp: 17 },
      { key: "d", timestamp: 18 },
    ];

    expect(keypressesToKeypressArray(keypresses)).toEqual([
      [
        { key: "h", timestamp: 0 },
        { key: "e", timestamp: 1 },
        { key: "l", timestamp: 2 },
        { key: "l", timestamp: 3 },
        { key: "p", timestamp: 4 },
        { key: " ", timestamp: 5 },
        { key: BACKSPACE_CHAR, timestamp: 10 },
        { key: BACKSPACE_CHAR, timestamp: 11 },
        { key: "o", timestamp: 12 },
        { key: " ", timestamp: 13 },
      ],
      [
        { key: "w", timestamp: 6 },
        { key: "o", timestamp: 7 },
        { key: BACKSPACE_CHAR, timestamp: 8 },
        { key: BACKSPACE_CHAR, timestamp: 9 },
        { key: "w", timestamp: 14 },
        { key: "o", timestamp: 15 },
        { key: "r", timestamp: 16 },
        { key: "l", timestamp: 17 },
        { key: "d", timestamp: 18 },
      ],
    ]);
  });
});

export {};
