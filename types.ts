
export type Position = {
  x: number;
  y: number;
};

export type PieceType = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z';

export interface Tetromino {
  shape: number[][];
  color: string;
  type: PieceType;
}

export type CellState = {
  filled: boolean;
  color: string | null;
  isValid: boolean; // Whether this cell is part of the heart
};

export interface LoveLetter {
  id: string;
  date: string;
  title: string;
  content: string;
}

export enum GameState {
  START = 'START',
  PLAYING = 'PLAYING',
  TRANSFERRING = 'TRANSFERRING',
  WIN = 'WIN',
  GAMEOVER = 'GAMEOVER'
}
