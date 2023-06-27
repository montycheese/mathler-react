
type GameData = {
    equation: string;
}

export default class MathlerClient {

    private gameDataAPIUrl;

    constructor(gameDataAPIUrl: string) {
        this.gameDataAPIUrl = gameDataAPIUrl;
    }

    async fetchLatestGameData(): Promise<GameData> {
        // pick a random one from the response to use for the puzzle
        try {
            const resp = await fetch(this.gameDataAPIUrl);
            const textResp = await resp.text();
            const equations = textResp.split('\n');
            let randomEquation = equations[Math.floor(Math.random() * equations.length)];
            randomEquation = randomEquation
                .replaceAll(' ', '') // remove spaces
                .replaceAll('–', '-'); // for some reason the minus operator in this github GIST uses an unusual unicode character
            return Promise.resolve({equation: randomEquation});
        } catch (error) {
            console.error('Failed to fetch game data from API', error);
            return Promise.reject(error);
        }
    }
}
