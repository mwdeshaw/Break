const Game = require("./classes/game");
const GView = require("./classes/g_view");

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementsByTagName("canvas")[0];
    canvas.width = Game.WIDTH;
    canvas.height = Game.HEIGHT;

    const ctx = canvas.getContext("2d");
    const game = new Game();
    new GView(game, ctx).start();
});