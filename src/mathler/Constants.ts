export enum MathlerTileState {
    CORRECT_PLACE = 0, // green
    DIFFERENT_PLACE = 1,// orange
    INCORRECT_VALUE = 2, // gray
    NO_VALUE = 3, // blank
    PENDING_SUBMISSION = 4 // white
};

export const VALID_CHARS = '1234567890+-/*';
export const SUPPORTED_OPERATORS = '+-/*';
export const MAX_CHARS_PER_ROW = 6;
export const MAX_TILES = 36;
