import MathlerGame from "./MathlerGame";

const puzzles = [
    '24*2-9',
    '27*3-9',
    '95/5+8',
    '1+2+33'
];

export default class GameEngine {
    public currentInstance: MathlerGame | null;

    constructor() {
        this.currentInstance = null;
    }

    getGameInstance = (): MathlerGame => {
        return this.currentInstance || this.startNewGameInstance();
    };

    startNewGameInstance = (): MathlerGame => {
        const equation = puzzles[Math.floor(Math.random() * puzzles.length)];
        const value = eval(equation);
        console.log(`Starting new game instance with eq: [${equation}] and value: [${value}]`);
        this.currentInstance = new MathlerGame(equation, value);
        return this.currentInstance;
    }

}
