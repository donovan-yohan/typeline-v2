export interface WordProps {
  expected: string;
  actual: string;
  id: string;
  passed: boolean;
  current: boolean;
  parentRef: React.RefObject<HTMLDivElement>;
  index: number;
}
