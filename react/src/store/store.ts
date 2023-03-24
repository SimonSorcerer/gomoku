import { atom } from 'jotai';
import { getWinner } from './board.utils';
import { initialCellData, initialTurn } from './defaults';
import { Board, NullablePiece, Piece } from './model';

const cellDataAtom = atom<Board>(initialCellData);

export const onTurnAtom = atom<Piece>(initialTurn);

export const boardAtom = atom(
    (get) => get(cellDataAtom),
    (get, set, updateIndex: number) => {
        const cellData = [...get(cellDataAtom)];
        const onTurn = get(onTurnAtom);
        const taken = !!cellData[updateIndex];

        if (!taken) {
            cellData[updateIndex] = onTurn;

            set(cellDataAtom, cellData);
            set(onTurnAtom, onTurn === 'circle' ? 'cross' : 'circle');
        }
    }
);

export const winnerAtom = atom<NullablePiece>((get) => {
    const board = get(cellDataAtom);

    const winner = getWinner(board);

    console.log(`Winner calculated: ${winner}`);
    return winner;
});
