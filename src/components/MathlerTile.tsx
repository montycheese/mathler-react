import {MathlerTileState} from "../mathler/Constants";
import {useEffect, useRef} from "react";
import './MathlerTile.css'

type MathlerTileProps = {
    input: string;
    state: MathlerTileState
}

export default function MathlerTile({ input, state }: MathlerTileProps) {

    const prevTileStateRef = useRef<MathlerTileState>(MathlerTileState.NO_VALUE);

    useEffect(() => {
        prevTileStateRef.current = state;
    }, [state]);

    let bkgColorClass = 'bg-white';
    let animationClasses = '';
    switch (state) {
        case MathlerTileState.CORRECT_PLACE:
            bkgColorClass = 'bg-green-500';
            if (prevTileStateRef.current !== MathlerTileState.CORRECT_PLACE) {
                animationClasses += 'zoom';
            }
            break;
        case MathlerTileState.DIFFERENT_PLACE:
            bkgColorClass = 'bg-orange-500';
            break;
        case MathlerTileState.INCORRECT_VALUE:
            bkgColorClass = 'bg-slate-400';
            break;
    }

    return (
        <div className={`${bkgColorClass} ${animationClasses} rounded-md text-black grid place-items-center p-2 w-10 h-10 hover:bg-cyan-100`}>
            {input}
        </div>
    );
}

MathlerTile.getBlankTile = (key: string) => <MathlerTile input="" state={MathlerTileState.NO_VALUE} key={key} />;
