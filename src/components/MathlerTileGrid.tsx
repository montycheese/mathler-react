import React from "react";
import MathlerTile from "./MathlerTile";
import {MathlerTileState, MAX_TILES} from "../mathler/Constants";
import useGameEngine from "../hooks/use-game-engine";

type MathlerTileGridProps = {
    pendingSubmissionInputs: string[]
}

export default function MathlerTileGrid({ pendingSubmissionInputs }: MathlerTileGridProps) {
    const { gameInstance } = useGameEngine();

    const tiles = [];

    let cellNum = 0;

    for (let i = 0; i < gameInstance.submissions.length; i++) {
        for (let j = 0; j < gameInstance.submissions[i].length; j++) {
            const tileVal = gameInstance.submissions[i][j];
            const state = gameInstance.getCharState(tileVal, j);
            const tile = <MathlerTile input={tileVal} state={state} key={`${++cellNum}`} />;
            tiles.push(tile);
        }
    }
    tiles.push(...pendingSubmissionInputs
        .map((val) => <MathlerTile input={val} state={MathlerTileState.PENDING_SUBMISSION} key={++cellNum} />));

    while(tiles.length < MAX_TILES) {
        tiles.push(MathlerTile.getBlankTile(`${++cellNum}`));
    }

    return (
        <div className="w-1/2 m-auto">
            <div className="grid grid-cols-6 gap-3 justify-between">
                {tiles}
            </div>
        </div>
    );
}
