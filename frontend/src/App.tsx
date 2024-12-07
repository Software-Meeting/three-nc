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
  IN_GAME,
  END
}

function App() {
  console.log(BACKEND_URL);
  const [state, setState] = useState(FEState.ENTER_GAME);
  const [room, setRoom] = useState<Colyseus.Room | null>(null);
  const [grid, updateGrid] = useGrid();

  const play = (index: number) => {
    if (index < 0 || index > 8 || grid[index] !== TileType.Empty) return;

    const newGrid = [...grid];
    newGrid[index] = TileType.X;
    updateGrid(newGrid);
  };


  const client = new Colyseus.Client(BACKEND_URL);

  const createGame = async (name: string) => {
    console.log('creating...');
    const room = await client.create("my_room");
    if (room === null) return;
    setRoom(room);
    setState(FEState.IN_GAME);
  }

  const joinGame = async (name: string, gameId: string) => {
    console.log("joining...");
    const room = await client.joinById(gameId, {name});
    setRoom(room);
    setState(FEState.IN_GAME);
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
        <form 
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <label> Player Name:
            <input type="text" name="name" id="name" required />
          </label>
          <br></br>
          <label> Game Id:
            <input type="text" name="gameId" id="gameId" />
          </label>
          <br></br>
          <button
            type="button"
            onClick={() => {
              createGame((document.getElementById("name") as HTMLInputElement).value);
            }}
          >Create New Game</button>

          <button
            type="button"
            onClick={() => {
              console.log('joining...');
              joinGame(
                (document.getElementById("name") as HTMLInputElement).value,
                (document.getElementById("gameId") as HTMLInputElement).value
              )
            }}>Join Game</button>
        </form>
      )}
      {state === FEState.IN_GAME && room !== null && (
        <h1>{room.id}</h1>
      )}
    </>
  );
}

export default App;
