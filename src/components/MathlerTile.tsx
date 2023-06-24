import {MathlerTileState} from "../mathler/Constants";

type MathlerTileProps = {
    input: string;
    state: MathlerTileState
}

export default function MathlerTile({ input, state }: MathlerTileProps) {

    let bkgColorClass = 'bg-white';
    switch (state) {
        case MathlerTileState.CORRECT_PLACE:
            bkgColorClass = 'bg-green-500';
            break;
        case MathlerTileState.DIFFERENT_PLACE:
            bkgColorClass = 'bg-orange-500';
            break;
        case MathlerTileState.INCORRECT_VALUE:
            bkgColorClass = 'bg-slate-400';
            break;
    }

    return (
        <div className={`${bkgColorClass} rounded-md text-white grid place-items-center p-2`}>
            {input}
        </div>
    );
}
