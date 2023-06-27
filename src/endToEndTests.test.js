import MathlerClient from "./clients/MathlerClient";
import GameEngine from "./mathler/GameEngine";

const MOCK_VALID_EQUATION = '1+22+3';
const MOCK_VALID_VALUE = 26;

let mockedMathlerClient;

beforeEach(() => {
    mockedMathlerClient = new MathlerClient('http://example.com/api');
    mockedMathlerClient.fetchLatestGameData = jest.fn()
        .mockResolvedValue({ equation: MOCK_VALID_EQUATION, value: MOCK_VALID_VALUE });
});

test('It can setup, play, and win a full game of mathler', async () => {
    const engine = new GameEngine(mockedMathlerClient);
    const gameInstance = await engine.startNewGameInstance();
    expect(gameInstance.isGameOver).toEqual(false);
    gameInstance.submitNewRow(
        MOCK_VALID_EQUATION.split('')
    );

    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.isGameWon()).toEqual(true);
});

test('It can setup, play, and win a full game of mathler after 6 rounds', async () => {
    const engine = new GameEngine(mockedMathlerClient);
    const gameInstance = await engine.startNewGameInstance();
    expect(gameInstance.isGameOver).toEqual(false);
    gameInstance.submitNewRow(['1','+','2','5','+','0']);
    gameInstance.submitNewRow(['0','+','2','5','+','1']);
    gameInstance.submitNewRow(['2','+','2','5','-','1']);
    gameInstance.submitNewRow(['3','+','2','5','-','2']);
    gameInstance.submitNewRow(['4','+','2','5','-','3']);
    gameInstance.submitNewRow(
        MOCK_VALID_EQUATION.split('')
    );

    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.isGameWon()).toEqual(true);
});

test('It can setup, play, and lose a full game of mathler', async () => {
    const engine = new GameEngine(mockedMathlerClient);
    const gameInstance = await engine.startNewGameInstance();
    expect(gameInstance.isGameOver).toEqual(false);
    gameInstance.submitNewRow(['1','+','2','5','+','0']);
    gameInstance.submitNewRow(['0','+','2','5','+','1']);
    gameInstance.submitNewRow(['2','+','2','5','-','1']);
    gameInstance.submitNewRow(['3','+','2','5','-','2']);
    gameInstance.submitNewRow(['4','+','2','5','-','3']);
    gameInstance.submitNewRow(['5','+','2','5','-','4']);
    expect(gameInstance.isGameOver).toEqual(true);
    expect(gameInstance.isGameWon()).toEqual(false);
});
