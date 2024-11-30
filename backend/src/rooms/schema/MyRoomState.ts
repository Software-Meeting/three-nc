import { Schema, Context, type, ArraySchema } from "@colyseus/schema";

export enum Tile {
  Empty = 0,
  X = 1,
  O = 2,
}

export class Player extends Schema {
  @type("string") name: string;
  @type("string") id: string;
}

export class MyRoomState extends Schema {
  @type("boolean") active: boolean;
  @type(Player) playerOne: Player | undefined;
  @type(Player) playerTwo: Player | undefined;
  @type("boolean") playerOnesTurn: boolean = true;
  @type(["int8"]) board = new ArraySchema<Tile>(
    ...Array<Tile>(9).fill(Tile.Empty)
  );
}
