import MathlerGame from "./MathlerGame";
import MathlerClient from "../clients/MathlerClient";

export default class GameEngine {
    public currentInstance: MathlerGame | null;
    private mathlerClient: MathlerClient;

    constructor(mathlerClient: MathlerClient) {
        this.mathlerClient = mathlerClient;
        this.currentInstance = null;
    }

     startNewGameInstance = async (): Promise<MathlerGame> => {
        const gameData = await this.mathlerClient.fetchLatestGameData();
        const value = eval(gameData.equation);
        console.log(`Starting new game instance with eq: [${gameData.equation}] and value: [${value}]`);
        this.currentInstance = new MathlerGame(gameData.equation, value);
        return this.currentInstance;
    }

}
