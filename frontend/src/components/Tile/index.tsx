import { TileType } from "./types";
import "./styles.css";

const TypeToSymbol = (type: TileType) => {
  switch (type) {
    case TileType.X:
      return "X";
    case TileType.O:
      return "O";
    default:
      return " ";
  }
};

const TypeToColor = (type: TileType) => {
  switch (type) {
    case TileType.X:
      return "crimson";
    case TileType.O:
      return "cyan";
    default:
      return "black";
  }
};

const Tile = ({ type, onClick }: { type: TileType; onClick: () => void }) => {
  return (
    <button
      className="tile"
      style={{ color: TypeToColor(type) }}
      onClick={onClick}
    >
      {TypeToSymbol(type)}
    </button>
  );
};

export default Tile;
