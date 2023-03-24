import { useAtomValue } from 'jotai';
import { onTurnAtom, winnerAtom } from '../../store/store';
import style from './message.module.css';

export const Message: React.FC = () => {
    const onTurn = useAtomValue(onTurnAtom);
    const winner = useAtomValue(winnerAtom);

    const message = !!winner ? (
        <>
            <div className={`${style[winner]} ${style.piece}`} /> is winner
        </>
    ) : (
        <>
            <div className={`${style[onTurn]} ${style.piece}`} /> is on turn
        </>
    );

    return <div className={style.wrapper}>{message}</div>;
};
