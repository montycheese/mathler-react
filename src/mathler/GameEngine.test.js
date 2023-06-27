import GameEngine from './GameEngine';
import MathlerClient from "../clients/MathlerClient";

let mockedMathlerClient;

const MOCK_EQUATION = '1+22+3';
const MOCK_VALUE = 26;

beforeEach(() => {
    mockedMathlerClient = new MathlerClient('http://example.com/api');
    mockedMathlerClient.fetchLatestGameData = jest.fn()
        .mockResolvedValue({ equation: MOCK_EQUATION, value: MOCK_VALUE });
});

test('It can create a new Mathler game instance', () => {

    const gameEngine = new GameEngine(mockedMathlerClient);
    expect(gameEngine.currentInstance).toBeNull();

    return gameEngine.startNewGameInstance().then(instance => {
        expect(instance).not.toBeNull();
        expect(instance.value).toEqual(MOCK_VALUE);
        expect(instance.calculation).toEqual(MOCK_EQUATION);
    });
});

test('Creating new game instance, fetches data from external API', () => {

    const gameEngine = new GameEngine(mockedMathlerClient);

    return gameEngine.startNewGameInstance().then(() => {
        expect(mockedMathlerClient.fetchLatestGameData).toHaveBeenCalledTimes(1);
    });
});




