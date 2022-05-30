export interface optionFlags {
  hasUppercase: boolean;
  hasNumbers: boolean;
  hasPunctuation: boolean;
  hasSymbols: boolean;
  minWordLength: number;
  maxWordLength: number;
}

export interface TestInfo {
  seed: string;
  options?: optionFlags;
  time: number;
}

export enum CHARACTER_PLACEMENT {
  BEFORE = "BEFORE",
  AFTER = "AFTER",
  MIDDLE = "MIDDLE",
  WRAP = "WRAP",
  ALONE = "ALONE"
}
