import GameEngine from './GameEngine';


test('It can create a new Mathler game instance', () => {
    const gameEngine = new GameEngine();
    expect(gameEngine.currentInstance).toBeNull();
    const gameInstance = gameEngine.startNewGameInstance();
    expect(gameInstance).not.toBeNull();
});

test('Get game instance creates a new instance if none are active', () => {
    const gameEngine = new GameEngine();
    expect(gameEngine.currentInstance).toBeNull();
    const gameInstance = gameEngine.getGameInstance();
    expect(gameInstance).not.toBeNull();
});

test('Get game instance returns the current instance', () => {
    const gameEngine = new GameEngine();
    const gameInstance = gameEngine.startNewGameInstance();
    expect(gameInstance).not.toBeNull();
    const fetchedInstance = gameEngine.getGameInstance();
    expect(gameInstance).toEqual(fetchedInstance);
});
