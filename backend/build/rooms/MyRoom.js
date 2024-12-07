"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoom = void 0;
const core_1 = require("@colyseus/core");
const MyRoomState_1 = require("./schema/MyRoomState");
class MyRoom extends core_1.Room {
    constructor() {
        super(...arguments);
        this.maxClients = 2;
    }
    onCreate(options) {
        console.log('created');
        this.setState(new MyRoomState_1.MyRoomState());
        this.onMessage("place", (client, message) => {
            if (!this.hasReachedMaxClients()) {
                client.error(1, "Game is not running");
                return;
            }
            if ((this.state.playerOne.id === client.sessionId &&
                !this.state.playerOnesTurn) ||
                (this.state.playerTwo.id === client.sessionId &&
                    this.state.playerOnesTurn)) {
                client.error(1, "It is not your turn");
                return;
            }
            if (message.tile < 0 || message.tile > 8) {
                client.error(1, "Invalid grid location");
                return;
            }
            if (this.state.board[message.tile] != MyRoomState_1.Tile.Empty) {
                client.error(1, "Grid location is not empty");
                return;
            }
            if (this.state.playerOnesTurn) {
                this.state.board[message.tile] = MyRoomState_1.Tile.X;
            }
            else {
                this.state.board[message.tile] = MyRoomState_1.Tile.O;
            }
            this.state.playerOnesTurn = !this.state.playerOnesTurn;
        });
    }
    onJoin(client, options) {
        const player = new MyRoomState_1.Player();
        player.id = client.sessionId;
        player.name = options.name;
        if (!this.state.playerOne) {
            this.state.playerOne = player;
        }
        else if (!this.state.playerTwo) {
            this.state.playerTwo = player;
        }
        else {
            client.leave();
        }
        this.state.active = this.hasReachedMaxClients();
    }
    onLeave(client, consented) {
        if (this.state.playerOne.id === client.sessionId) {
            this.state.playerOne = undefined;
        }
        else if (this.state.playerTwo.id === client.sessionId) {
            this.state.playerTwo = undefined;
        }
        this.state.active = this.hasReachedMaxClients();
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.MyRoom = MyRoom;
