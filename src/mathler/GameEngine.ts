import MathlerGame from "./MathlerGame";

const puzzles = [
    '24*2-9',
    '27*3-9',
    '95/5+8'
];

export default class GameEngine {
    public currentInstance: MathlerGame | null;

    constructor() {
        this.currentInstance = null;
    }

    getGameInstance = (): MathlerGame => {
        return this.currentInstance || this.startNewGameInstance();
    }

    startNewGameInstance = (): MathlerGame => {
        const equation = puzzles[Math.floor(Math.random() * puzzles.length)];
        console.log(equation, typeof equation);
        const value = eval(equation);
        console.log(`Starting new game instance with ${equation} and value: ${value}`);
        this.currentInstance = new MathlerGame(equation, value);
        return this.currentInstance;
    }

}
