import MathlerTile from "./MathlerTile";
import {MathlerTileState} from "../mathler/Constants";
import useGameEngine from "../hooks/use-game-engine";

const MAX_TILES = 36;

type MathlerTileGridProps = {
    pendingSubmissionInputs: string[]
}

export default function MathlerTileGrid({ pendingSubmissionInputs }: MathlerTileGridProps) {
    const { gameInstance } = useGameEngine();

    const tiles = [];

    for (let i = 0; i < gameInstance.submissions.length; i++) {
        for (let j = 0; j < gameInstance.submissions[i].length; j++) {
            const tileVal = gameInstance.submissions[i][j];
            const state = gameInstance.getCharState(tileVal, j);
            const tile = <MathlerTile input={tileVal} state={state} key={`${i}${j}`} />;
            tiles.push(tile);
        }
    }
    tiles.push(...pendingSubmissionInputs.map((val, i) => <MathlerTile input={val} state={MathlerTileState.PENDING_SUBMISSION} key={i}/>))

    while(tiles.length < MAX_TILES) {
        tiles.push(MathlerTile.blank);
    }

    return (
        <div className="w-1/2 m-auto">
            <div className="grid grid-cols-6 gap-3 justify-between">
                {tiles}
            </div>
        </div>
    );
}
