import { useAtomValue } from 'jotai';
import { onTurnAtom, winnerAtom } from '../../store/store';
import { Symbol } from '../symbol/Symbol';
import style from './message.module.css';

export const Message: React.FC = () => {
    const onTurn = useAtomValue(onTurnAtom);
    const winner = useAtomValue(winnerAtom);

    return (
        <div className={style.wrapper}>
            <Symbol piece={onTurn} className={style.piece} />{' '}
            {!!winner ? ' is winner' : 'is on turn'}
        </div>
    );
};
