import React, {useEffect} from 'react';
import './App.css';
import MathlerTileGrid from "./components/MathlerTileGrid";
import useGameEngine from "./hooks/use-game-engine";
import TileInputForm from "./components/TileInputForm";


function App() {
    const { gameInstance } = useGameEngine();


    useEffect(() => {

    }, []);

  return (
    <div className="mt-3">
        <div className="flex flex-basis-1/2 justify-center">
            <h1 className="text-3xl text-zinc-50">Mathler</h1>
        </div>
        <div className="flex flex-basis-1/2 justify-center">
            <span className="text-md text-zinc-50">Find the hidden calculation that equals X</span>
        </div>
        <MathlerTileGrid />
        <TileInputForm onSubmit={console.log} onDelete={console.log}/>

    </div>
  );
}

export default App;
