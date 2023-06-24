import GameEngine from "../mathler/GameEngine";

const gameEngine = new GameEngine();

export default function useGameEngine() {
    return {
        startNewGameInstance: gameEngine.startNewGameInstance,
        gameInstance: gameEngine.getGameInstance()
    };
}
