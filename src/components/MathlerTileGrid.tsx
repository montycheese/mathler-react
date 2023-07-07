import React from "react";
import MathlerTile from "./MathlerTile";
import {MathlerTileState, MAX_TILES} from "../mathler/Constants";
import MathlerGame from "../mathler/MathlerGame";

type MathlerTileGridProps = {
    pendingSubmissionInputs: string[],
    gameInstance: MathlerGame
}

export default function MathlerTileGrid({ pendingSubmissionInputs, gameInstance }: MathlerTileGridProps) {
    const tiles = [];

    let cellNum = 0;

    for (let i = 0; i < gameInstance.submissions.length; i++) {

        const submissionRow = gameInstance.submissions[i];
        const charStates = gameInstance.getCharStatesForRow(submissionRow);
        tiles.push(...charStates.map((state, j) => (
            <MathlerTile input={submissionRow[j]} state={state} key={`${++cellNum}`} />
        )));
    }
    tiles.push(...pendingSubmissionInputs
        .map((val) => <MathlerTile input={val} state={MathlerTileState.PENDING_SUBMISSION} key={++cellNum} />));

    while(tiles.length < MAX_TILES) {
        tiles.push(MathlerTile.getBlankTile(`${++cellNum}`));
    }

    return (
        <div className="w-64 m-auto">
            <div className="grid grid-cols-6 gap-1 justify-between">
                {tiles}
            </div>
        </div>
    );
}
