"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyRoomState = exports.Player = exports.Tile = void 0;
const schema_1 = require("@colyseus/schema");
var Tile;
(function (Tile) {
    Tile[Tile["Empty"] = 0] = "Empty";
    Tile[Tile["X"] = 1] = "X";
    Tile[Tile["O"] = 2] = "O";
})(Tile || (exports.Tile = Tile = {}));
class Player extends schema_1.Schema {
}
exports.Player = Player;
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "name", void 0);
__decorate([
    (0, schema_1.type)("string")
], Player.prototype, "id", void 0);
class MyRoomState extends schema_1.Schema {
    constructor() {
        super(...arguments);
        this.playerOnesTurn = true;
        this.board = new schema_1.ArraySchema(...Array(9).fill(Tile.Empty));
    }
}
exports.MyRoomState = MyRoomState;
__decorate([
    (0, schema_1.type)("boolean")
], MyRoomState.prototype, "active", void 0);
__decorate([
    (0, schema_1.type)(Player)
], MyRoomState.prototype, "playerOne", void 0);
__decorate([
    (0, schema_1.type)(Player)
], MyRoomState.prototype, "playerTwo", void 0);
__decorate([
    (0, schema_1.type)("boolean")
], MyRoomState.prototype, "playerOnesTurn", void 0);
__decorate([
    (0, schema_1.type)(["int8"])
], MyRoomState.prototype, "board", void 0);
