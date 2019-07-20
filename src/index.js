import Game from "./classes/game";
import GView from "./classes/g_view";

document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.getElementById("start-game");
    startBtn.onclick = () => {
        const light = document.getElementById('power-lt');
        light.setAttribute("class", "active");

        const audio = document.querySelector(`audio`);
        audio.currentTime = 0;
        audio.play();

        const canvas = document.getElementById("board");
        const ctx = canvas.getContext("2d");
        const game = new Game(ctx);
        new GView(game).start();
    };
});