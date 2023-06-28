import GameEngine from "../mathler/GameEngine";
import MathlerClient from "../clients/MathlerClient";

// @ts-ignore
const mathlerClient = new MathlerClient(process.env.REACT_APP_GAME_DATA_API_URL);

const gameEngine = new GameEngine(mathlerClient);

export default function useGameEngine() {
    return {
        startNewGameInstance: gameEngine.startNewGameInstance,
        gameInstance: gameEngine.currentInstance,
        gameEngine
    };
}
