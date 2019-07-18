import Game from "./classes/game";
import GView from "./classes/g_view";

document.addEventListener("DOMContentLoaded", () => {
    const canvas = document.getElementById("board");
    const ctx = canvas.getContext("2d");
    const game = new Game(ctx);
    new GView(game).start();
});