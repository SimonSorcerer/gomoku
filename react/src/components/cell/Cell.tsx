import { NullablePiece } from '../../store/model';
import style from './cell.module.css';

export interface CellProps {
    cell: NullablePiece;
    onClick?: () => void;
}

export const Cell: React.FC<CellProps> = ({ cell, onClick }) => {
    return (
        <div className={style.wrapper} onClick={onClick}>
            <div className={style[cell]} />
        </div>
    );
};
