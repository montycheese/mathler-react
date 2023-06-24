import React, {useState} from 'react';
import './App.css';
import MathlerTileGrid from "./components/MathlerTileGrid";
import useGameEngine from "./hooks/use-game-engine";
import TileInputForm from "./components/TileInputForm";
import {isValidEquation} from "./mathler/Helpers";


function App() {
    const { gameInstance } = useGameEngine();
    const [currentSubmissionRow, setCurrentSubmissionRow] = useState([]);

    const onAddNewInput = (val: string): void => {
        // @ts-ignore
        setCurrentSubmissionRow(currentSubmissionRow.concat(val));
    };

    const onDeleteInput  = (): void => {
        // @ts-ignore
        setCurrentSubmissionRow(currentSubmissionRow.slice(0, currentSubmissionRow.length-1));
    };

    const onSubmitInput = (): void => {
        if (currentSubmissionRow.length !== 6) return;
        else if (!isValidEquation(currentSubmissionRow.join(''))) {
            // TODO show error
            return;
        }
        gameInstance.submitNewRow(currentSubmissionRow);
        setCurrentSubmissionRow([]);

    };

    const renderWinnerMessage = () => {
        if (gameInstance.isGameWon()) {
            return (
              <div className="text-white text-xl">
                  🎉 Well done, you've won!
              </div>
            );
        }
        return null;
    };

    const renderInputElements = () => {
        if (gameInstance.isGameOver) {
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
        <div className="flex flex-basis-1/2 justify-center my-3">
            <span className="text-md text-zinc-50">Find the hidden calculation that equals {gameInstance.value}</span>
        </div>
        <MathlerTileGrid pendingSubmissionInputs={currentSubmissionRow} />
        <div className="mt-3">
            {renderInputElements()}
            {renderWinnerMessage()}
        </div>

    </div>
  );
}

export default App;
