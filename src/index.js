import Game from "./classes/game";
import GView from "./classes/g_view";

document.addEventListener("DOMContentLoaded", () => {
    const powerBtn = document.getElementById("power-btn");
    powerBtn.onclick = () => {
        const light = document.getElementById('power-lt');
        light.setAttribute("class", "active");
        const startScreen = document.getElementById('start-screen');
        startScreen.setAttribute("class", "active");

        const audio = document.querySelector(`audio`);
        audio.currentTime = 0;
        audio.play();

        const startBtn = document.getElementById("start-game");
        startBtn.onclick = () => {
            startScreen.removeAttribute("class");
            const canvas = document.getElementById("board");
            // canvas.setAttribute("class", "active");
            const ctx = canvas.getContext("2d");
            const game = new Game(ctx);
            new GView(game).start();
        };
    };
});