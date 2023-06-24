import {SUPPORTED_OPERATORS} from "./Constants";

export function isValidEquation(equation: string): boolean {
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
        console.error(error);
    }
    return isValid;
}
