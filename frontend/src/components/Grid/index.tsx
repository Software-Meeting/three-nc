import Tile from "../Tile";
import { TileType } from "../Tile/types";
import "./styles.css";

const Grid = ({
  tiles,
  onPlay,
}: {
  tiles: TileType[];
  onPlay: (index: number) => void;
}) => {
  const handleClick = (index: number) => {
    if (tiles[index] === TileType.Empty) {
      onPlay(index);
    }
  };

  return (
    <div className="grid">
      <div className="row">
        <Tile type={tiles[0]} onClick={() => handleClick(0)} />
        <Tile type={tiles[1]} onClick={() => handleClick(1)} />
        <Tile type={tiles[2]} onClick={() => handleClick(2)} />
      </div>
      <div className="row">
        <Tile type={tiles[3]} onClick={() => handleClick(3)} />
        <Tile type={tiles[4]} onClick={() => handleClick(4)} />
        <Tile type={tiles[5]} onClick={() => handleClick(5)} />
      </div>
      <div className="row">
        <Tile type={tiles[6]} onClick={() => handleClick(6)} />
        <Tile type={tiles[7]} onClick={() => handleClick(7)} />
        <Tile type={tiles[8]} onClick={() => handleClick(8)} />
      </div>
    </div>
  );
};

export default Grid;
