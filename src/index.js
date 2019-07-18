const Game = require("./classes/game");
const GView = require("./classes/g_view");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("board");

    const ctx = canvas.getContext("2d");
    const game = new Game(ctx);
    new GView(game).start();
});