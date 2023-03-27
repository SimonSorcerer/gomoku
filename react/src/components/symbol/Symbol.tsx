import { Piece } from '../../store/model';
import style from './symbol.module.css';

export interface PieceProps {
    piece: Piece;
    className?: string;
}

export const Symbol: React.FC<PieceProps> = ({ piece, className }) => {
    const composedClassName = `${style[piece]} ${className}`;

    return <div className={composedClassName} />;
};
