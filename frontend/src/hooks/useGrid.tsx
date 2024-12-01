import { useState } from "react";
import { TileType } from "../components/Tile/types";

type Grid = TileType[];

const useGrid = () => {
  const [grid, setGrid] = useState<Grid>([
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
    TileType.Empty,
  ]);

  const updateGrid = (newGrid: Grid) => {
    setGrid(newGrid);
  };

  return { grid, updateGrid };
};

export default useGrid;
