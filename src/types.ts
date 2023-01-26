export type UserKeys = { up: string; down: string };

export type User = {
  name: string;
  score: number;
  position: 'left' | 'right';
  color: string;
  keys: UserKeys;
  isComputer: boolean;
};

export type ObjectEdges = Record<'top' | 'bottom' | 'left' | 'right', number>;
