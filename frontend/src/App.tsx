import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./components/Grid";
import { TileType } from "./components/Tile/types";
import useGrid from "./hooks/useGrid";

function App() {
  const [count, setCount] = useState(0);
  const [grid, updateGrid] = useGrid();

  const play = (index: number) => {
    if (index < 0 || index > 8 || grid[index] !== TileType.Empty) return;

    const newGrid = [...grid];
    newGrid[index] = TileType.X;
    updateGrid(newGrid);
  };

  const [inGame, setInGame] = useState(false);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <button onClick={() => setInGame(!inGame)}>
        {inGame ? "Leave" : "Start"} Game
      </button>
      {inGame && (
        <div className="game">
          <Grid tiles={grid} onPlay={(i) => play(i)} />
        </div>
      )}
    </>
  );
}

export default App;
