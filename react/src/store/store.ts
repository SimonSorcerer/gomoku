import { atom } from 'jotai';
import { checkWinner } from './board.utils';
import { initialCellData, initialTurn } from './defaults';
import { Board, MetaBoard, NullablePiece, Piece } from './model';

const cellDataAtom = atom<Board>(initialCellData);
export const metaDataAtom = atom<MetaBoard>(undefined);
export const onTurnAtom = atom<Piece>(initialTurn);
export const winnerAtom = atom<NullablePiece>('');

export const boardAtom = atom(
    (get) => get(cellDataAtom),
    (get, set, updateIndex: number) => {
        const cellData = [...get(cellDataAtom)];
        const onTurn = get(onTurnAtom);
        const taken = !!cellData[updateIndex];

        if (!taken) {
            cellData[updateIndex] = onTurn;

            const winnerSlice = checkWinner(cellData, updateIndex);

            if (winnerSlice) {
                set(metaDataAtom, checkWinner(cellData, updateIndex));
                set(winnerAtom, onTurn);
            }

            set(cellDataAtom, cellData);
            set(onTurnAtom, onTurn === 'circle' ? 'cross' : 'circle');
        }
    }
);
