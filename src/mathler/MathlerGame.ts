// represents a game instance of Mathler
import {MathlerTileState, MAX_SUBMISSIONS, SUPPORTED_OPERATORS} from "./Constants";

export default class MathlerGame {
    public calculation: string;
    public value: number;
    public submissions: string[][];
    public isGameOver: boolean;

    constructor(calculation: string, value: number) {
        if (!MathlerGame.isValidEquation(calculation) || eval(calculation) !== value) {
            throw new Error('Cannot instantiate a game instance with an invalid equation.');
        }

        this.calculation = calculation;
        this.value = value;
        this.submissions = [];
        this.isGameOver = false;
    }

    submitNewRow(submission: string[]) {
        if (!this.isGameOver) {
            const submissionStr = submission.join('');

            if (!MathlerGame.isValidEquation(submissionStr)) {
                throw new Error('Cannot submit an invalid equation.');
            }

            this.submissions.push(submission);

            if (this.isCorrectSolution(submissionStr)) {
                this.isGameOver = true;

                // rearrange the solution if they found a communtative version
                if (this.hasFoundCommuntativeSolution(submissionStr)) {
                    this.submissions.pop();
                    this.submissions.push(this.calculation.split(''));
                }

            } else {
                if (this.submissions.length === MAX_SUBMISSIONS) {
                    this.isGameOver = true;
                }
            }
        } else {
            throw new Error('Cannot submit row because game is over.')
        }
    }

    isCorrectSolution(calculation: string): boolean {
        try {
            return eval(calculation) == this.value
                && this.checkSameCharacters(calculation, this.calculation);
        } catch (error) {
            console.error('Error while validating equation', error);
            return false;
        }

    }

    hasFoundCommuntativeSolution(calculation: string): boolean {
        return calculation !== this.calculation && this.checkSameCharacters(calculation, this.calculation);
    }

    isGameWon(): boolean {
        if (this.submissions.length === 0) return false;
        const lastSubmittedEquationString = this.submissions[this.submissions.length - 1].join('');
        return this.isGameOver && this.isCorrectSolution(lastSubmittedEquationString);
    }

    getCharState(char: string, index: number): MathlerTileState {
        if (char.length !== 1) {
            throw new Error('Invalid char. Must be of length 1.');
        }
        if (this.calculation[index] === char) {
            return MathlerTileState.CORRECT_PLACE;
        } else if (this.calculation.includes(char)) {
            return MathlerTileState.DIFFERENT_PLACE;
        }
        return MathlerTileState.INCORRECT_VALUE;
    }

    checkSameCharacters(str1: string, str2: string) {
        // Check if the lengths of the cleaned strings are equal
        if (str1.length !== str2.length) {
            return false;
        }

        // Create frequency maps for each string
        const frequencyMap1 = {};
        const frequencyMap2 = {};

        // Populate frequency maps for str1
        for (let char of str1) {
            // @ts-ignore
            frequencyMap1[char] = (frequencyMap1[char] || 0) + 1;
        }

        // Populate frequency maps for str2
        for (let char of str2) {
            // @ts-ignore
            frequencyMap2[char] = (frequencyMap2[char] || 0) + 1;
        }

        // Check if the frequency maps are equal
        for (let char in frequencyMap1) {
            // @ts-ignore
            if (frequencyMap1[char] !== frequencyMap2[char]) {
                return false;
            }
        }

        return true;
    }

    static isValidEquation(equation: string): boolean {
        let isValid = false;

        // ensure that the equation contains at least one operator.
        for (let i = 0; i < SUPPORTED_OPERATORS.length; i++) {
            if (equation.includes(SUPPORTED_OPERATORS[i])) {
                isValid = true;
                break;
            }
        }

        try {
            const result = eval(equation);
            isValid = isValid && typeof result === 'number' && result >= 0;
        } catch (error) {
            console.debug('Error thrown while executing equation.', error);
            isValid = false;
        }
        return isValid;
    }


}
