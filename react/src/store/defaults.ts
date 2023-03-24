import { NullablePiece, Piece } from './model';

export const BOARD_SIZE = 15;
export const TOTAL_CELL_COUNT = BOARD_SIZE * BOARD_SIZE;

export const initialCellData: NullablePiece[] = new Array<NullablePiece>(
    TOTAL_CELL_COUNT
).fill('');

export const initialTurn: Piece = 'circle';
