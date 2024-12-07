import { Room, Client } from "@colyseus/core";
import { MyRoomState, Player, Tile } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients = 2;

  onCreate(options: {}) {
    console.log('created');
    this.setState(new MyRoomState());

    this.onMessage("place", (client, message: { tile: number }) => {
      if (!this.hasReachedMaxClients()) {
        client.error(1, "Game is not running");
        return;
      }

      if (
        (this.state.playerOne.id === client.sessionId &&
          !this.state.playerOnesTurn) ||
        (this.state.playerTwo.id === client.sessionId &&
          this.state.playerOnesTurn)
      ) {
        client.error(1, "It is not your turn");
        return;
      }

      if (message.tile < 0 || message.tile > 8) {
        client.error(1, "Invalid grid location");
        return;
      }

      if (this.state.board[message.tile] != Tile.Empty) {
        client.error(1, "Grid location is not empty");
        return;
      }

      if (this.state.playerOnesTurn) {
        this.state.board[message.tile] = Tile.X;
      } else {
        this.state.board[message.tile] = Tile.O;
      }
      this.state.playerOnesTurn = !this.state.playerOnesTurn;
    });
  }

  onJoin(client: Client, options: { name: string }) {
    const player = new Player();
    player.id = client.sessionId;
    player.name = options.name;
    if (!this.state.playerOne) {
      this.state.playerOne = player;
    } else if (!this.state.playerTwo) {
      this.state.playerTwo = player;
    } else {
      client.leave();
    }
    this.state.active = this.hasReachedMaxClients();
    console.log("player joined")
  }

  onLeave(client: Client, consented: boolean) {
    if (this.state.playerOne.id === client.sessionId) {
      this.state.playerOne = undefined;
    } else if (this.state.playerTwo.id === client.sessionId) {
      this.state.playerTwo = undefined;
    }
    this.state.active = this.hasReachedMaxClients();
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }
}
