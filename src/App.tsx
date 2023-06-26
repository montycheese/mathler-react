import React, {useEffect, useState} from 'react';
import './App.css';
import MathlerTileGrid from "./components/MathlerTileGrid";
import useGameEngine from "./hooks/use-game-engine";
import TileInputForm from "./components/TileInputForm";
import toast, { Toaster } from 'react-hot-toast';
import MathlerGame from "./mathler/MathlerGame";


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
        if (currentSubmissionRow.length !== 6) return;
        else if (!MathlerGame.isValidEquation(currentSubmissionRow.join(''))) {
            console.error('Not valid equation', currentSubmissionRow.join(''));
            toast.error('You cannot submit an invalid equation.');
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
                        className="text-white bg-gray-900 p-2 rounded-lg disabled:bg-gray-800 hover:bg-gray-800"
                        onClick={onSubmitInput}
                        disabled={currentSubmissionRow.length !== 6}>
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
