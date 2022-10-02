import { KeypressType } from "../../../../interfaces/typeline";

export interface HistoryWordProps {
  expected: string;
  keypresses: KeypressType[];
  id: string;
  passed: boolean;
  current: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
}
