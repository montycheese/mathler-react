import React, {useEffect, useState} from 'react';
import './App.css';
import MathlerTileGrid from "./components/MathlerTileGrid";
import useGameEngine from "./hooks/use-game-engine";
import TileInputForm from "./components/TileInputForm";
import toast, { Toaster } from 'react-hot-toast';
import MathlerGame from "./mathler/MathlerGame";
import {MAX_SUBMISSIONS, SUPPORTED_OPERATORS, VALID_CHARS} from "./mathler/Constants";


function App() {
    const { gameEngine } = useGameEngine();
    const [gameInstance, setGameInstance] = useState<MathlerGame | null>(null);
    const [currentSubmissionRow, setCurrentSubmissionRow] = useState<string[]>([]);

    useEffect( () => {
        const run = async () => {
            const instance = await gameEngine.startNewGameInstance();
            setGameInstance(instance);
        };

        run();
    }, []);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    });

    const handleKeyDown = (e: any) => {
        if (e.target.tagName === 'INPUT') return; // ignore any keystrokes made in the input form.
        if (e.key === 'Backspace') {
            onDeleteInput();
        } else if (e.key === 'Enter') {
            onSubmitInput();
        } else {
            if (isNextCharValid(e.key)) {
                onAddNewInput(e.key);
            }
        }
    };

    const onAddNewInput = (val: string): void => {
        if (currentSubmissionRow.length < MAX_SUBMISSIONS) {
            setCurrentSubmissionRow(currentSubmissionRow.concat(val));
        }
    };

    const onDeleteInput  = (): void => {
        if (currentSubmissionRow.length === 0) return;
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

    const isNextCharValid = (char: string) => {
        const isOperator = (char: string) => SUPPORTED_OPERATORS.includes(char);
        let valid = false;
        const lastChar = currentSubmissionRow[currentSubmissionRow.length - 1];
        if (isOperator(lastChar) && isOperator(char)) {
            // two operators can not be side by side
            toast.error('You cannot place two operators next to each other.');
        } else if (isOperator(char) && (currentSubmissionRow.length === 0 || currentSubmissionRow.length === 5)) {
            // first or last char cannot be an operator
            toast.error('You cannot place an operator in this position.');
        } else if (lastChar === '0' && !isOperator(char)) {
            // do not allow putting a number after 0
            toast.error('You cannot place a number after 0.');
        } else if (lastChar === '/' && char === '0') {
            // prevent divide by 0
            toast.error('You cannot divide zero.');
        } else if (VALID_CHARS.includes(char)) {
            valid = true;
        }
        return valid;
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
                    isNextCharValid={isNextCharValid}
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
        <div className="flex basis-1/2 justify-center">
            <h1 className="text-3xl text-zinc-50">Mathler</h1>
        </div>

        { gameInstance && (
            <>
                <div className="flex basis-1/2 justify-center my-3">
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
