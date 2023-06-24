// represents a game instance of Mathler
import {MathlerTileState, MAX_SUBMISSIONS} from "./Constants";

export default class MathlerGame {
    public calculation: string;
    public value: number;
    public submissions: string[][];
    public isGameOver: boolean;

    constructor(calculation: string, value: number) {
        this.calculation = calculation;
        this.value = value;
        this.submissions = [];
        this.isGameOver = false;
    }

    submitNewRow(submission: string[]) {
        if (this.submissions.length < MAX_SUBMISSIONS) {
            this.submissions.push(submission);
            console.log('submitting new row', submission)
            if (this.isValidEquation(submission.join(''))) {
                this.isGameOver = true;
            } else {
                if (this.submissions.length === MAX_SUBMISSIONS) {
                    this.isGameOver = true;
                }
            }
        }
    }

    isValidEquation(calculation: string): boolean {
        try {
            return eval(calculation) == this.value
                && this.checkSameCharacters(calculation, this.calculation);
        } catch (error) {
            console.error('Error while validating equation', error);
            return false;
        }

    }

    isGameWon(): boolean {
        if (this.submissions.length === 0) return false;
        const lastSubmittedEquationString = this.submissions[this.submissions.length - 1].join('');
        return this.isGameOver && this.isValidEquation(lastSubmittedEquationString);
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

}
