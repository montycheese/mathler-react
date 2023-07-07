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
            return eval(calculation) === this.value
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

    getCharStatesForRow(row: string[]): MathlerTileState[] {
        // Use a map to track the number of occurrences a character has been detected in the
        // submission but is in the incorrect location wrt the string.
        // In this implementation, we decide to mark the most recent instances of a mismatch as yellow
        // and anything after that is marked as gray.
        const charToNumInstancesCountedMap:{[id: string]: number;} = {};

        const charStates: MathlerTileState[] = [];
        for (let i = 0; i < row.length; i++) {
            const char = row[i];
            charToNumInstancesCountedMap[char] = !isNaN(charToNumInstancesCountedMap[char]) ? charToNumInstancesCountedMap[char]+1 : 0;
            if (this.calculation[i] === char) {
                charStates.push(MathlerTileState.CORRECT_PLACE);
            } else if (this.calculation.includes(char)) {
                const occurrencesInString = this.calculation.split(char).length - 1;
                const occurrencesInSubmission = row.filter(r => r === char).length;

                if (occurrencesInSubmission === occurrencesInString) {
                    charStates.push(MathlerTileState.DIFFERENT_PLACE);
                } else {
                    const occurrencesInSubmissionThatMatchExcludingCurrentIndex =
                        row.filter((c, j) => {
                            return this.calculation[j] === c && c === char && i !== j;
                        }).length;
                    if (occurrencesInSubmissionThatMatchExcludingCurrentIndex === occurrencesInString) {
                        // user has submitted char correctly in the right positions.
                        // this instance of the char is therefore not valid.
                        charStates.push(MathlerTileState.INCORRECT_VALUE);
                    } else if (occurrencesInSubmissionThatMatchExcludingCurrentIndex < occurrencesInString) {
                        // user has not correctly matched all of the instances of this character
                        // therefore we can mark this as different place
                        // potential edge case, if there are only 1 spot, but they input 2, but both are in the wrong place.
                        // we choose the first occurrence to be yellow and any subsequent one to be gray.

                        if (charToNumInstancesCountedMap[char] < occurrencesInString) {
                            charStates.push(MathlerTileState.DIFFERENT_PLACE);
                        } else {
                            charStates.push(MathlerTileState.INCORRECT_VALUE);
                        }
                    }
                }

            } else {
                charStates.push(MathlerTileState.INCORRECT_VALUE);
            }

        }


        return charStates;
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
            console.debug('Error thrown while executing equation.');
            isValid = false;
        }
        return isValid;
    }


}
