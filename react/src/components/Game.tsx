import { Board } from './board/Board';
import style from './game.module.css';
import { Message } from './message/Message';

export const Game: React.FC = () => {
    return (
        <div className={style.wrapper}>
            <Message />
            <Board />
        </div>
    );
};
