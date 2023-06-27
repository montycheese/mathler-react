import React, {useEffect, useState} from 'react';
import './App.css';
import MathlerTileGrid from "./components/MathlerTileGrid";
import useGameEngine from "./hooks/use-game-engine";
import TileInputForm from "./components/TileInputForm";
import toast, { Toaster } from 'react-hot-toast';
import MathlerGame from "./mathler/MathlerGame";
import {MAX_SUBMISSIONS} from "./mathler/Constants";


function App() {
    const { gameEngine} = useGameEngine();
    const [gameInstance, setGameInstance] = useState<MathlerGame | null>(null);
    const [currentSubmissionRow, setCurrentSubmissionRow] = useState<string[]>([]);

    useEffect( () => {
        const run = async () => {
            const instance = await gameEngine.startNewGameInstance();
            setGameInstance(instance);
        };

        run();
    }, []);

    const onAddNewInput = (val: string): void => {
        setCurrentSubmissionRow(currentSubmissionRow.concat(val));
    };

    const onDeleteInput  = (): void => {
        setCurrentSubmissionRow(currentSubmissionRow.slice(0, currentSubmissionRow.length-1));
    };

    const onSubmitInput = (): void => {
        const submissionStr = currentSubmissionRow.join('');
        if (currentSubmissionRow.length !== MAX_SUBMISSIONS) return;
        else if (!MathlerGame.isValidEquation(submissionStr)) {
            console.error(`Not a valid equation, ${submissionStr}`);
            toast.error('You cannot submit an invalid equation.');
            return;
        } else if (eval(submissionStr) !== gameInstance!.value) {
            console.error(`Equation does not equal ${gameInstance!.value}. ${submissionStr}`);
            toast.error(`Equation does not equal ${gameInstance!.value}`);
            return;
        }
        gameInstance!.submitNewRow(currentSubmissionRow);
        setCurrentSubmissionRow([]);

    };

    const renderEndGameMessage = () => {
        if (!gameInstance!.isGameOver) {
            return null;
        }
        const msg = gameInstance!.isGameWon() ? '🎉 Well done, you\'ve won!' : '😢 Sorry, better luck next time!';

        return (
            <div className="flex flex-row justify-center text-white text-xl">
                {msg}
            </div>
        );
    };

    const renderInputElements = () => {
        if (gameInstance!.isGameOver) {
            return null;
        }
        return (
            <>
                <TileInputForm
                    onAdd={onAddNewInput}
                    onDelete={onDeleteInput}
                    currentEquation={currentSubmissionRow}
                />
                <div className="flex flex-row justify-center mt-3">
                    <button
                        className="text-white bg-gray-900 p-2 rounded-lg drop-shadow-md disabled:opacity-25 hover:bg-gray-800 hover:drop-shadow-xl"
                        onClick={onSubmitInput}
                        disabled={currentSubmissionRow.length !== MAX_SUBMISSIONS}>
                        Submit row
                    </button>
                </div>
            </>
        );
    };


  return (
    <div className="mt-3">
        <div className="flex flex-basis-1/2 justify-center">
            <h1 className="text-3xl text-zinc-50">Mathler</h1>
        </div>

        { gameInstance && (
            <>
                <div className="flex flex-basis-1/2 justify-center my-3">
                    <span className="text-md text-zinc-50">Find the hidden calculation that equals {gameInstance!.value}</span>
                </div>
                <MathlerTileGrid pendingSubmissionInputs={currentSubmissionRow} gameInstance={gameInstance} />
                <div className="mt-3">
                    {renderInputElements()}
                    {renderEndGameMessage()}
                </div>
            </>
        )}
        <Toaster position="top-right"/>
    </div>
  );
}

export default App;
