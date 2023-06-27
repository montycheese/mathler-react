import React from 'react';
import renderer from 'react-test-renderer';
import MathlerTile from "./MathlerTile";
import {MathlerTileState} from "../mathler/Constants";

it('renders "no value" state correctly', () => {
    const component = renderer.create(
        <MathlerTile
            input={''}
            state={MathlerTileState.NO_VALUE}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders "incorrect value" state correctly', () => {
    const component = renderer.create(
        <MathlerTile
            input={'1'}
            state={MathlerTileState.INCORRECT_VALUE}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders "different place value" state correctly', () => {
    const component = renderer.create(
        <MathlerTile
            input={'1'}
            state={MathlerTileState.DIFFERENT_PLACE}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders "correct place value" state correctly', () => {
    const component = renderer.create(
        <MathlerTile
            input={'1'}
            state={MathlerTileState.CORRECT_PLACE}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders "pending submission value" state correctly', () => {
    const component = renderer.create(
        <MathlerTile
            input={'+'}
            state={MathlerTileState.PENDING_SUBMISSION}
        />,
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

