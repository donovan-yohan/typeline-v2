import { KeypressType } from "../../../../interfaces/typeline";
import { BACKSPACE_CHAR } from "../../../utils";
import { generateStats } from "../statsGenerator";

describe("statsGenerator.ts", () => {
  test("generateStats should return correct when actual and expected match", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "b", timestamp: 1000 },
      { key: "c", timestamp: 2000 }
    ];
    const mockExpected = ["abc"];
    const mockTotalTime = 3;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats.length).toBe(mockTotalTime);
    stats.forEach((stat) => {
      expect(stat.correct).toBe(1);
      expect(stat.incorrect).toBe(0);
      expect(stat.corrected).toBe(0);
      expect(stat.incorrectWords).toEqual([]);
    });
  });

  test("generateStats should split stats according to second they happened in", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "b", timestamp: 500 },
      { key: "c", timestamp: 1000 },
      { key: "d", timestamp: 1250 },
      { key: "e", timestamp: 1750 },
      { key: "f", timestamp: 1900 },
      { key: "g", timestamp: 2500 }
    ];
    const mockExpected = ["abcdefg"];
    const mockTotalTime = 3;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats.length).toBe(mockTotalTime);

    expect(stats[0].correct).toBe(2);
    expect(stats[0].incorrect).toBe(0);
    expect(stats[0].corrected).toBe(0);
    expect(stats[0].incorrectWords).toEqual([]);

    expect(stats[1].correct).toBe(4);

    expect(stats[2].correct).toBe(1);
  });

  test("should add incorrect when mismatched", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "a", timestamp: 500 },
      { key: "a", timestamp: 1000 },
      { key: "a", timestamp: 1500 }
    ];
    const mockExpected = ["abcdefg"];
    const mockTotalTime = 3;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats[0].correct).toBe(1);
    expect(stats[0].incorrect).toBe(1);
    expect(stats[0].incorrectWords).toEqual(["abcdefg"]);

    expect(stats[1].incorrect).toBe(2);
    expect(stats[0].incorrectWords).toEqual(["abcdefg"]);
  });

  test("should add corrected when incorrect removed", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "a", timestamp: 500 },
      { key: "a", timestamp: 1000 },
      { key: BACKSPACE_CHAR, timestamp: 2000 },
      { key: BACKSPACE_CHAR, timestamp: 2500 }
    ];
    const mockExpected = ["abcdefg"];
    const mockTotalTime = 3;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats[2].corrected).toBe(2);
  });

  test("should do nothing when correct removed", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: BACKSPACE_CHAR, timestamp: 1000 }
    ];
    const mockExpected = ["abcdefg"];
    const mockTotalTime = 2;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats[0].correct).toBe(1);

    expect(stats[1].correct).toBe(0);
    expect(stats[1].corrected).toBe(0);
    expect(stats[1].incorrect).toBe(0);
  });

  test("should read space character as correct when correct", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "b", timestamp: 100 },
      { key: "c", timestamp: 200 },
      { key: " ", timestamp: 300 },
      { key: "d", timestamp: 400 },
      { key: "e", timestamp: 500 },
      { key: "f", timestamp: 600 }
    ];
    const mockExpected = ["abc", "def"];
    const mockTotalTime = 1;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats[0].correct).toBe(7);
  });

  test("should read space character as incorrect when incorrect", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "b", timestamp: 100 },
      { key: " ", timestamp: 300 },
      { key: "d", timestamp: 400 },
      { key: "e", timestamp: 500 },
      { key: "f", timestamp: 600 }
    ];
    const mockExpected = ["abc", "def"];
    const mockTotalTime = 1;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats[0].correct).toBe(5);
    expect(stats[0].incorrect).toBe(1);
  });

  test("should read backspace character as corrected when previous word incorrect", () => {
    const mockKeypresses: KeypressType[] = [
      { key: "a", timestamp: 0 },
      { key: "b", timestamp: 100 },
      { key: " ", timestamp: 300 },
      { key: "d", timestamp: 400 },
      { key: BACKSPACE_CHAR, timestamp: 500 },
      { key: BACKSPACE_CHAR, timestamp: 600 },
      { key: "c", timestamp: 700 },
      { key: " ", timestamp: 800 },
      { key: "d", timestamp: 900 }
    ];
    const mockExpected = ["abc", "def"];
    const mockTotalTime = 1;

    const stats = generateStats(mockKeypresses, mockExpected, mockTotalTime);

    expect(stats[0].correct).toBe(6);
    expect(stats[0].incorrect).toBe(1);
    expect(stats[0].corrected).toBe(1);
  });
});
