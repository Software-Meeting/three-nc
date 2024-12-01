import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Grid from "./components/Grid";
import { TileType } from "./components/Tile/types";
import useGrid from "./hooks/useGrid";
import * as Colyseus from "colyseus.js";
import { BACKEND_URL } from './backend.ts';

enum FEState {
  ENTER_GAME,
  ENTER_NAME,
  IN_GAME,
  END
}

function App() {
  console.log(BACKEND_URL);
  const [state, setState] = useState(FEState.ENTER_GAME);
  const [grid, updateGrid] = useGrid();
  const [gameCode, updateGameCode] = useState('');

  const play = (index: number) => {
    if (index < 0 || index > 8 || grid[index] !== TileType.Empty) return;

    const newGrid = [...grid];
    newGrid[index] = TileType.X;
    updateGrid(newGrid);
  };


  const client = new Colyseus.Client(BACKEND_URL);

  const attemptJoinGame = async (game: string): Promise<string> => {
    const room = await client.joinOrCreate(game);
    console.log(room.sessionId, "joined", room.name);
    return room.sessionId;
  }

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
      <h1>3ᴺoughts & Crosses</h1>
            <button onClick={() => setInGame(!inGame)}>
        {inGame ? "Leave" : "Start"} Game
      </button>
      {inGame && (
        <div className="game">
          <Grid tiles={grid} onPlay={(i) => play(i)} />
        </div>
      )}
      {state === FEState.ENTER_GAME && (
        <form>
          <label>Game Code:</label>
          <input
            type="text"
            onChange={(e) => updateGameCode(e.target.value)}
          />
        </form>
      )}
      {state === FEState.ENTER_GAME && (
        <button onClick={() => {
          try {
            attemptJoinGame(gameCode);
            setState(FEState.ENTER_NAME);
          } catch (e) {
            alert(e);
          };
        }}/>
      )}
    </>
  );
}

export default App;
