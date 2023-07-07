import React from 'react';
import renderer from 'react-test-renderer';
import MathlerGame from "../mathler/MathlerGame";
import MathlerTileGrid from "./MathlerTileGrid";

const VALID_EQUATION = '24*2-9';
const VALID_EQUATION_VALUE = 39;


it('renders a blank grid correctly', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION, VALID_EQUATION_VALUE);
    const component = renderer.create(
        <MathlerTileGrid pendingSubmissionInputs={[]} gameInstance={gameInstance}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders an unsubmitted row on a grid correctly', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION, VALID_EQUATION_VALUE);
    const component = renderer.create(
        <MathlerTileGrid pendingSubmissionInputs={VALID_EQUATION.split('')} gameInstance={gameInstance}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders an submitted but incorrect row on a grid correctly', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION, VALID_EQUATION_VALUE);

    const submissionAttempt = "39+1-1";
    gameInstance.submitNewRow(submissionAttempt.split(''));
    const component = renderer.create(
        <MathlerTileGrid pendingSubmissionInputs={[]} gameInstance={gameInstance}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders a completed game correctly', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION, VALID_EQUATION_VALUE);

    gameInstance.submitNewRow(VALID_EQUATION.split(''));
    const component = renderer.create(
        <MathlerTileGrid pendingSubmissionInputs={[]} gameInstance={gameInstance}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders a lost game correctly', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION, VALID_EQUATION_VALUE);

    const submissionAttempts = [
        "39+1-1", "39+2-2", "39+3-3", "39+4-4", "39+5-5", "39+6-6"
    ];

    submissionAttempts.forEach(s => gameInstance.submitNewRow(s.split('')));


    const component = renderer.create(
        <MathlerTileGrid pendingSubmissionInputs={[]} gameInstance={gameInstance}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders a game completed on the final round correctly', () => {
    const gameInstance = new MathlerGame(VALID_EQUATION, VALID_EQUATION_VALUE);

    const submissionAttempts = [
        "39+1-1", "39+2-2", "39+3-3", "39+4-4", "39+5-5", VALID_EQUATION
    ];

    submissionAttempts.forEach(s => gameInstance.submitNewRow(s.split('')));


    const component = renderer.create(
        <MathlerTileGrid pendingSubmissionInputs={[]} gameInstance={gameInstance}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
