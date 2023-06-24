import MathlerTile from "./MathlerTile";
import {MathlerTileState} from "../mathler/Constants";


export default function MathlerTileGrid() {

    const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18]
    return (
        <div className="w-1/2 m-auto">
            <div className="grid grid-cols-6 gap-3 justify-between">
                {arr.map(i => <MathlerTile input={`${i}`} state={MathlerTileState.CORRECT_PLACE} />)}
            </div>
        </div>
    );
}
