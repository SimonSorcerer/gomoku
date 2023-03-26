export type Piece = 'circle' | 'cross';
export type NullablePiece = Piece | '';
export type Board = NullablePiece[];
export type MetaData = 0 | 1 | 2;
export type MetaBoard = MetaData[] | undefined;
