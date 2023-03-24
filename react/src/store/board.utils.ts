import { BOARD_SIZE, TOTAL_CELL_COUNT } from './defaults';
import { Board, NullablePiece } from './model';

const WIN_COUNT = 5;

const checkWinnerInSlice = (boardSlice: Board): NullablePiece => {
    if (boardSlice.every((cell) => cell === 'circle')) {
        return 'circle';
    }
    if (boardSlice.every((cell) => cell === 'cross')) {
        return 'cross';
    }

    return '';
};

const getWinnerHorizontalRight = (
    board: Board,
    startIndex: number
): NullablePiece => {
    const slice = board.slice(startIndex, startIndex + WIN_COUNT);
    return checkWinnerInSlice(slice);
};

const getWinnerDiagonalRightUp = (
    board: Board,
    startIndex: number
): NullablePiece => {
    const slice = [board[startIndex]];

    for (let k = 1; k < WIN_COUNT; k++) {
        const index = startIndex - (BOARD_SIZE - 1) * k;

        if (index < 0) {
            break;
        } else {
            slice.push(board[index]);
        }
    }

    console.log('slice is: ', slice);

    if (slice.length === WIN_COUNT) {
        return checkWinnerInSlice(slice);
    }

    return '';
};

const getWinnerDiagonalRightDown = (
    board: Board,
    startIndex: number
): NullablePiece => {
    const slice = [board[startIndex]];

    for (let k = 1; k < WIN_COUNT; k++) {
        const index = startIndex + (BOARD_SIZE + 1) * k;

        if (index >= TOTAL_CELL_COUNT) {
            break;
        } else {
            slice.push(board[index]);
        }
    }

    if (slice.length === WIN_COUNT) {
        return checkWinnerInSlice(slice);
    }

    return '';
};

const getWinnerForCell = (board: Board, index: number): NullablePiece => {
    const ru = getWinnerDiagonalRightUp(board, index);
    if (ru) {
        return ru;
    }

    const rd = getWinnerDiagonalRightDown(board, index);
    if (rd) {
        return rd;
    }

    const hr = getWinnerHorizontalRight(board, index);
    if (hr) {
        return hr;
    }

    return '';
};

// TODO: Optimize it and calculate winner only for last changed piece
export const getWinner = (board: Board): NullablePiece => {
    let winner: NullablePiece = '';

    board.forEach((cell, index) => {
        if (!winner) {
            winner = getWinnerForCell(board, index);
        }
    });

    return winner;
};
