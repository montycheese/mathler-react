import React from 'react';
import renderer from 'react-test-renderer';
import TileInputForm from "./TileInputForm";

it('renders correctly with empty current submissions', () => {
    const noop = () => {};
    const component = renderer.create(
        <TileInputForm onAdd={noop} onDelete={noop} isNextCharValid={noop} currentEquation={[]}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with partial current submissions', () => {
    const noop = () => {};
    const component = renderer.create(
        <TileInputForm onAdd={noop} onDelete={noop} isNextCharValid={noop} currentEquation={['1', '+', "2"]}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});

it('renders correctly with full current submissions', () => {
    const noop = () => {};
    const component = renderer.create(
        <TileInputForm onAdd={noop} onDelete={noop} isNextCharValid={noop} currentEquation={['1', '+', "2", "2", "-", "1"]}/>
    );
    let tree = component.toJSON();
    expect(tree).toMatchSnapshot();
});
