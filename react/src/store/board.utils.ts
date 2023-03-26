import { BOARD_SIZE, TOTAL_CELL_COUNT, WIN_COUNT } from './defaults';
import { Board, MetaBoard } from './model';

// const checkWinnerInSlice = (boardSlice: Board): NullablePiece => {
//     if (boardSlice.every((cell) => cell === 'circle')) {
//         return 'circle';
//     }
//     if (boardSlice.every((cell) => cell === 'cross')) {
//         return 'cross';
//     }

//     return '';
// };

// const getWinnerHorizontalRight = (
//     board: Board,
//     startIndex: number
// ): NullablePiece => {
//     const slice = board.slice(startIndex, startIndex + WIN_COUNT);
//     return checkWinnerInSlice(slice);
// };

// const getWinnerDiagonalRightUp = (
//     board: Board,
//     startIndex: number
// ): NullablePiece => {
//     const slice = [board[startIndex]];

//     for (let k = 1; k < WIN_COUNT; k++) {
//         const index = startIndex - (BOARD_SIZE - 1) * k;

//         if (index < 0) {
//             break;
//         } else {
//             slice.push(board[index]);
//         }
//     }

//     if (slice.length === WIN_COUNT) {
//         return checkWinnerInSlice(slice);
//     }

//     return '';
// };

// const getWinnerDiagonalRightDown = (
//     board: Board,
//     startIndex: number
// ): NullablePiece => {
//     const slice = [board[startIndex]];

//     for (let k = 1; k < WIN_COUNT; k++) {
//         const index = startIndex + (BOARD_SIZE + 1) * k;

//         if (index >= TOTAL_CELL_COUNT) {
//             break;
//         } else {
//             slice.push(board[index]);
//         }
//     }

//     if (slice.length === WIN_COUNT) {
//         return checkWinnerInSlice(slice);
//     }

//     return '';
// };

// const getWinnerForCell = (board: Board, index: number): NullablePiece => {
//     const ru = getWinnerDiagonalRightUp(board, index);
//     if (ru) {
//         return ru;
//     }

//     const rd = getWinnerDiagonalRightDown(board, index);
//     if (rd) {
//         return rd;
//     }

//     const hr = getWinnerHorizontalRight(board, index);
//     if (hr) {
//         return hr;
//     }

//     return '';
// };

// // TODO: Optimize it and calculate winner only for last changed piece
// export const getWinner = (board: Board): NullablePiece => {
//     let winner: NullablePiece = '';

//     board.forEach((cell, index) => {
//         if (!winner) {
//             winner = getWinnerForCell(board, index);
//         }
//     });

//     return winner;
// };

const createDirectionVectors = (): number[][] => [
    [-1, -1],
    [-1, 0],
    [0, -1],
    [-1, 1],
];

const rotateVector = (vector: number[]): number[] => [
    vector[0] * -1,
    vector[1] * -1,
];

const mapDirectionVectorToBoardIndex = (
    startIndex: number,
    vector: number[]
): number => {
    const index = startIndex + vector[0] + vector[1] * BOARD_SIZE;

    if (index < 0 || index >= TOTAL_CELL_COUNT) {
        return -1;
    }

    return index;
};

export const checkWinner = (
    board: Board,
    startIndex: number
): MetaBoard | undefined => {
    const directionVectors = createDirectionVectors();
    const onTurn = board[startIndex];

    let streak = 0;
    let shadowBoard: number[] | undefined = undefined;

    directionVectors.forEach((vector) => {
        if (shadowBoard) {
            return;
        }
        shadowBoard = new Array(TOTAL_CELL_COUNT).fill(0);

        streak = 0;
        let index = startIndex;
        let piece = board[index];

        do {
            shadowBoard[index] = 1;
            streak += 1;
            index = mapDirectionVectorToBoardIndex(index, vector);

            if (index !== -1) {
                piece = board[index];
            }
        } while (index !== -1 && piece === onTurn);

        index = startIndex;
        streak -= 1;

        do {
            shadowBoard[index] = 1;
            streak += 1;
            index = mapDirectionVectorToBoardIndex(index, rotateVector(vector));

            if (index !== -1) {
                piece = board[index];
            }
        } while (index !== -1 && piece === onTurn);

        if (streak < WIN_COUNT) {
            shadowBoard = undefined;
        }
    });

    return shadowBoard;
};
