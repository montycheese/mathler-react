import GameEngine from "../mathler/GameEngine";
import MathlerClient from "../clients/MathlerClient";

const mathlerClient = new MathlerClient('https://gist.githubusercontent.com/fredericboivin/79520252fc89cf861485f88d6492c78d/raw/66a222d51a5b3f171144d00a7afcf286efcc0245/mathler.txt');

const gameEngine = new GameEngine(mathlerClient);

export default function useGameEngine() {
    return {
        startNewGameInstance: gameEngine.startNewGameInstance,
        gameInstance: gameEngine.currentInstance,
        gameEngine
    };
}
