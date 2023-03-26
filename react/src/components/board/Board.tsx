import { useAtom, useAtomValue } from 'jotai';
import { boardAtom, metaDataAtom, winnerAtom } from '../../store/store';
import { Cell } from '../cell/Cell';
import style from './board.module.css';

export const Board: React.FC = () => {
    const [cells, setCell] = useAtom(boardAtom);
    const winner = useAtomValue(winnerAtom);
    const metaBoard = useAtomValue(metaDataAtom);

    const handleCellClick = (index: number) => {
        if (!winner) {
            setCell(index);
        }
    };

    return (
        <div className={style.wrapper}>
            {cells.map((cell, index) => (
                <Cell
                    key={index}
                    cell={cell}
                    metaData={metaBoard ? metaBoard[index] : undefined}
                    onClick={() => handleCellClick(index)}
                />
            ))}
        </div>
    );
};
