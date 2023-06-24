import MathlerTile from "./MathlerTile";
import {MathlerTileState} from "../mathler/Constants";
import useGameEngine from "../hooks/use-game-engine";

const MAX_TILES = 36;

export default function MathlerTileGrid() {
    const { gameInstance } = useGameEngine();

    const tiles = [];

    for (let i = 0; i < gameInstance.submissions.length; i++) {
        for (let j = 0; j < gameInstance.submissions[i].length; j++) {
            const tileVal = gameInstance.submissions[i][j];
            const state = MathlerTileState.NO_VALUE;
            const tile = <MathlerTile input={tileVal} state={state} />;
            tiles.push(tile);
        }
    }

    console.log(tiles);

    return (
        <div className="w-1/2 m-auto">
            <div className="grid grid-cols-6 gap-3 justify-between">
                {tiles}
            </div>
        </div>
    );
}
