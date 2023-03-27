import { MetaData, NullablePiece } from '../../store/model';
import { Symbol } from '../symbol/Symbol';
import style from './cell.module.css';

export interface CellProps {
    cell: NullablePiece;
    metaData?: MetaData;
    onClick?: () => void;
}

export const Cell: React.FC<CellProps> = ({ cell, metaData, onClick }) => {
    return (
        <div
            className={`${style.wrapper} ${metaData ? style.highlight : ''}`}
            onClick={onClick}
        >
            {cell && <Symbol piece={cell} />}
        </div>
    );
};
