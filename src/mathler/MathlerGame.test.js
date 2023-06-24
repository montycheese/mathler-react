import MathlerGame from "./MathlerGame";
import {MathlerTileState} from "./Constants";

const VALID_EQUATION_1 = '24*2-9';
const VALID_EQUATION_1_VALUE = 39;

const VALID_EQUATION_2 = '95/5+8';
const VALID_EQUATION_2_VALUE = 27;

const INVALID_EQUATION_1 = '24*22-';

const INVALID_EQUATION_NEG_NUMBER = '1-1-12';
const INVALID_EQUATION_NEG_NUMBER_VALUE = -14;


test('A new instance can be created from valid inputs.', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION_1, VALID_EQUATION_1_VALUE);
    expect(gameInstance).toBeDefined();
    expect(gameInstance.calculation).toEqual(VALID_EQUATION_1);
    expect(gameInstance.value).toEqual(VALID_EQUATION_1_VALUE);
    expect(gameInstance.submissions.length).toEqual(0);
    expect(gameInstance.isGameOver).toEqual(false);
});

test('A new instance cannot be created from invalid inputs', () => {
    // test equation and value are mis matched
    const invalidValueEquation1 = 1;
    expect(() => new MathlerGame(VALID_EQUATION_1, invalidValueEquation1))
        .toThrow('Cannot instantiate a game instance with an invalid equation.');

    // test equation has invalid syntax
    expect(() => new MathlerGame(INVALID_EQUATION_1, 0))
        .toThrow('Cannot instantiate a game instance with an invalid equation.');

    // test equation that calculates to a negative number
    expect(() => new MathlerGame(INVALID_EQUATION_NEG_NUMBER, INVALID_EQUATION_NEG_NUMBER_VALUE))
        .toThrow('Cannot instantiate a game instance with an invalid equation.');
});

test('Submitting a winning solution ends the game', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION_1, VALID_EQUATION_1_VALUE);

    const submissionAsStrArray = VALID_EQUATION_1.split('');
    gameInstance.submitNewRow(submissionAsStrArray);

    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.isGameWon()).toEqual(true);
});

test('Submitting a communatitive winning solution ends the game', () => {
    const canonialSolutionEquation = '1+2+34';
    const communatitiveSolutionEquation = '2+1+34';
    const value = 37;

    const gameInstance = new MathlerGame(canonialSolutionEquation, value);

    const submissionAsStrArray = communatitiveSolutionEquation.split('');
    gameInstance.submitNewRow(submissionAsStrArray);

    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.isGameWon()).toEqual(true);
});

test('Cannot submit another submission after winning the game', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION_1, VALID_EQUATION_1_VALUE);

    const submissionAsStrArray = VALID_EQUATION_1.split('');
    gameInstance.submitNewRow(submissionAsStrArray);

    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.isGameWon()).toEqual(true);

    expect(() => gameInstance.submitNewRow(submissionAsStrArray))
        .toThrow();
});

test('Can only submit up to 6 solutions', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION_1, VALID_EQUATION_1_VALUE);

    const incorrectSubmissionAsStrArray = VALID_EQUATION_2.split('');

    // first 5 submissions
    for (let i = 0; i < 5; i++) {
        gameInstance.submitNewRow(incorrectSubmissionAsStrArray);

        expect(gameInstance.isGameOver).toEqual(false);
        expect(gameInstance.submissions.length).toEqual(i + 1);
    }

    // 6th
    gameInstance.submitNewRow(incorrectSubmissionAsStrArray);
    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.submissions.length).toEqual(6);

    // attempting 7th
    expect(() => gameInstance.submitNewRow(incorrectSubmissionAsStrArray))
        .toThrow();
});

test('Cannot submit an invalid equation', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION_1, VALID_EQUATION_1_VALUE);
    const submissionAsStrArray = INVALID_EQUATION_1.split('');

    expect(() => gameInstance.submitNewRow(submissionAsStrArray))
        .toThrow();
});

test('Check char state correctly returns when a value is in the correct location', () => {
    const equation = '1+2+34';
    const value = 37;
    const gameInstance = new MathlerGame(equation, value);

    const submissionStr = '1+37-1';
    const submissionAsStrArray = submissionStr.split('');
    gameInstance.submitNewRow(submissionAsStrArray);

    expect(gameInstance.getCharState('1', 0))
        .toEqual(MathlerTileState.CORRECT_PLACE);
});

test('Check char state correctly returns when a value is correct but in the wrong location', () => {
    const equation = '1+2+34';
    const value = 37;
    const gameInstance = new MathlerGame(equation, value);

    const submissionStr = '37-1+1';
    const submissionAsStrArray = submissionStr.split('');
    gameInstance.submitNewRow(submissionAsStrArray);

    expect(gameInstance.getCharState('3', 0))
        .toEqual(MathlerTileState.DIFFERENT_PLACE);
});

test('Check char state correctly returns when a value is not found in the equation', () => {
    const equation = '1+2+34';
    const value = 37;
    const gameInstance = new MathlerGame(equation, value);

    const submissionStr = '37-1+1';
    const submissionAsStrArray = submissionStr.split('');
    gameInstance.submitNewRow(submissionAsStrArray);

    expect(gameInstance.getCharState('-', 2))
        .toEqual(MathlerTileState.INCORRECT_VALUE);
});
